export type AudioRecorderState = "paused" | "inactive" | "recording";
export interface AudioRecorder {
    state: AudioRecorderState;
    url: string | null;
    error: string | null;
    blob: Blob | null;
    done: boolean;
}
export interface AudioRecorderHook extends AudioRecorder {
    /**
     * Starts recording audio by requesting microphone access and initializing a MediaRecorder instance.
     *
     * This method will update the internal state to 'recording' if successful. If microphone access is denied
     * or another error occurs, the error property will be updated.
     *
     * @returns A promise that resolves when recording has successfully started.
     */
    start: () => Promise<void>;
    /**
     * Stops recording audio.
     *
     * This method stops the MediaRecorder, finalizes the recording, generates an audio URL,
     * and updates the internal state to 'inactive'.
     */
    stop: () => void;
    /**
     * Pauses the current recording.
     *
     * This method pauses the MediaRecorder and waits for the available audio data to be processed.
     * The generated audio URL reflects the data recorded up to the pause moment.
     *
     * @returns A promise that resolves when the pause operation has completed.
     */
    pause: () => Promise<void>;
    /**
     * Resumes a paused recording.
     *
     * This method resumes the MediaRecorder if it is in the 'paused' state and updates the internal
     * state back to 'recording', clearing any previously generated audio URL.
     */
    resume: () => void;
    /**
     * Cancels the current recording.
     *
     * This method stops the MediaRecorder (if active), clears all recorded audio data, and resets the state and audio URL.
     *
     * @returns A promise that resolves when the cancellation operation is complete.
     */
    cancel: () => Promise<void>;
    /**
     * Resets the internal state.
     *
     * This method resets the recorder state to its initial state.
     *
     * @returns A promise that resolves when the reset operation is complete.
     */
    reset: () => Promise<void>;
    /**
     * Requests the current audio data recorded so far.
     *
     * This method triggers the MediaRecorder to request any available audio data and returns a promise
     * that resolves with an array of Blob objects containing the audio data.
     *
     * @returns A promise that resolves with an array of Blob objects representing the recorded audio.
     */
    requestData: () => Promise<Blob[]>;
    /**
     * The current MediaRecorder instance in use, or null if no recording is active.
     */
    mediaRecorder: MediaRecorder | null;
    /**
     * The current state of the recorder: 'paused', 'inactive', or 'recording'.
     */
    state: AudioRecorderState;
    /**
     * The ObjectURL generated for the recorded audio, if available; otherwise, null.
     */
    url: string | null;
    /**
     * Contains an error message if an error occurred (such as issues accessing the microphone), otherwise null.
     */
    error: string | null;
}
