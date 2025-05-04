import { useState, useRef } from 'react';

export const useRecorder = () => {
    const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunks = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.current.push(event.data);
                }
            };

            mediaRecorder.start();
        } catch (error) {
            alert('Failed to start recording.');
        }
    };

    const stopRecording = () => {
        return new Promise<string>((resolve) => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();

                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    setMediaBlobUrl(url);
                    resolve(url);
                };
            }
        });
    };

    return { startRecording, stopRecording, mediaBlobUrl };
};