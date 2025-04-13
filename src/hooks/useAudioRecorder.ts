import { useRef, useState } from "react";
import { noop } from "../utils";
import { AudioRecorder, AudioRecorderHook } from "./types";

const initial: AudioRecorder = {
  state: "inactive",
  url: null,
  error: null,
  done: false,
  blob: null,
};

/**
 * Hook that provides audio recording functionality.
 *
 * This hook leverages the MediaRecorder API to enable recording via the user's microphone.
 * It offers functions to start, pause, resume, stop, and cancel recording as well as a method to request
 * the recorded audio data in the form of Blob chunks.
 *
 * ## Example
 * ```tsx
 * function AudioRecorderComponent() {
 *    const { start, stop, url, error } = useAudioRecorder();
 *
 *    return (
 *       <div>
 *          <button onClick={start}>Start Recording</button>
 *          <button onClick={stop}>Stop Recording</button>
 *          {url && <audio src={url} controls />}
 *          {error && <p>Error: {error}</p>}
 *       </div>
 *    );
 * }
 * ```
 */
export function useAudioRecorder(): AudioRecorderHook {
  const [recorder, setRecorder] = useState<AudioRecorder>({
    ...initial,
  });

  const paused = recorder.state === "paused";
  const recording = recorder.state === "recording";
  const inactive = recorder.state === "inactive";

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const resolveAudio = useRef<(value: Blob[]) => void>(noop);
  const resolveStop = useRef<(value: void) => void>(noop);

  const mediaRecorder = mediaRecorderRef.current;

  /**
   * Using the current audioChunks, creates a Blob and then creates an ObjectURL
   * @returns ObjectURL generated with the current audioChunks
   */
  const generateBlob = () => {
    const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);
    return { url, blob };
  };

  const requestData = async (): Promise<Blob[]> => {
    const audioPromise = new Promise<Blob[]>((resolve) => {
      resolveAudio.current = resolve;
      if (!mediaRecorder) return resolve([]);
      mediaRecorder.requestData();
    });

    const blob = await audioPromise;

    return blob;
  };

  const requestStop = async () => {
    const stopPromise = new Promise<void>((resolve) => {
      resolveStop.current = resolve;
      if (!mediaRecorder) return resolve();
      mediaRecorder.stop();
    });

    await stopPromise;

    return;
  };

  const start = async () => {
    const newRecorder: AudioRecorder = {
      ...recorder,
      error: null,
      blob: null,
      done: false,
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      newMediaRecorder.ondataavailable = (event) => {
        if (event.data.size <= 0) return;
        audioChunksRef.current.push(event.data);
        resolveAudio.current([...audioChunksRef.current]);
      };

      newMediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        resolveStop.current();
      };

      newMediaRecorder.start();
      mediaRecorderRef.current = newMediaRecorder;
      newRecorder.state = "recording";
      newRecorder.url = null;
    } catch (err) {
      console.error("Error accessing microphone", err);
      newRecorder.error = "Microphone access denied or not supported.";
    }
    setRecorder(newRecorder);
  };

  const pause = async () => {
    if (!mediaRecorder || !recording) return;

    mediaRecorder.pause();

    //Wait for the browser to run 'ondataavailable'
    await requestData();

    const { url, blob } = generateBlob();
    setRecorder({ ...recorder, state: "paused", url, blob, done: false });
  };

  const resume = () => {
    if (!mediaRecorder || !paused) return;
    mediaRecorder.resume();
    setRecorder({ ...recorder, state: "recording", url: null, done: false });
  };

  const stop = async () => {
    if (!mediaRecorder || inactive) return;
    await requestStop();

    const { blob, url } = generateBlob();

    setRecorder({ ...recorder, state: "inactive", blob, url, done: true });
  };

  const reset = async () => {
    audioChunksRef.current = [];

    await requestStop();

    setRecorder({
      ...initial,
    });
  };

  const cancel = async () => {
    if (!mediaRecorder || inactive) return;
    await reset();
  };

  const controls = { start, stop, cancel, pause, resume, reset, requestData };

  return {
    mediaRecorder,
    ...recorder,
    ...controls,
  };
}
