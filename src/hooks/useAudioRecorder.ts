import { useRef, useState } from "react";
import { AudioRecorder, AudioRecorderHook } from "./types";
import { noop } from "../utils";

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
    state: "inactive",
    url: null,
    error: null,
  });

  const paused = recorder.state === "paused";
  const recording = recorder.state === "recording";
  const inactive = recorder.state === "inactive";

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const resolveAudio = useRef(noop);
  const resolveStop = useRef(noop);

  /**
   * Using the current audioChunks, creates a Blob and then creates an ObjectURL
   * @returns ObjectURL generated with the current audioChunks
   */
  const generateUrl = () => {
    const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    return URL.createObjectURL(blob);
  };

  const requestData = async (): Promise<Blob[]> => {
    const audioPromise = new Promise<Blob[]>((resolve) => {
      resolveAudio.current = resolve;
      if (!mediaRecorderRef.current) return resolve([]);
      mediaRecorderRef.current.requestData();
    });

    const blob = await audioPromise;

    return blob;
  };

  const requestStop = async () => {
    const stopPromise = new Promise<void>((resolve) => {
      resolveStop.current = resolve;
      if (!mediaRecorderRef.current) return resolve();
      mediaRecorderRef.current.stop();
    });

    await stopPromise;

    return;
  };

  const start = async () => {
    const newRecorder: AudioRecorder = { ...recorder, error: null };
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size <= 0) return;
        audioChunksRef.current.push(event.data);
        resolveAudio.current([...audioChunksRef.current]);
      };

      mediaRecorder.onstop = () => {
        const url = generateUrl();
        stream.getTracks().forEach((track) => track.stop());
        setRecorder({ ...recorder, url });
        resolveStop.current();
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      newRecorder.state = "recording";
      newRecorder.url = null;
    } catch (err) {
      console.error("Error accessing microphone", err);
      newRecorder.error = "Microphone access denied or not supported.";
    }
    setRecorder(newRecorder);
  };

  const pause = async () => {
    if (!mediaRecorderRef.current || !recording) return;

    mediaRecorderRef.current.pause();

    //Wait for the browser to run 'ondataavailable'
    await requestData();

    const url = generateUrl();
    setRecorder({ ...recorder, state: "paused", url });
  };

  const resume = () => {
    if (!mediaRecorderRef.current || !paused) return;
    mediaRecorderRef.current.resume();
    setRecorder({ ...recorder, state: "recording", url: null });
  };

  const stop = () => {
    if (!mediaRecorderRef.current || inactive) return;
    mediaRecorderRef.current.stop();
    setRecorder({ ...recorder, state: "inactive" });
  };

  const cancel = async () => {
    if (!mediaRecorderRef.current || inactive) return;

    audioChunksRef.current = [];
    await requestStop();

    setRecorder({ ...recorder, state: "inactive", url: null });
  };

  const controls = { start, stop, cancel, pause, resume };

  return {
    requestData,
    mediaRecorder: mediaRecorderRef.current,
    ...recorder,
    ...controls,
  };
}
