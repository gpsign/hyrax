import { AudioRecorderHook } from "./types";
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
export declare function useAudioRecorder(): AudioRecorderHook;
