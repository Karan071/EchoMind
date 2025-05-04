import { useState, useEffect } from 'react';

interface SpeechRecognitionEvent {
    results: {
        [index: number]: SpeechRecognitionResultList;
    } & ArrayLike<SpeechRecognitionResultList>;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
}

interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
}

export const useSpeechRecognition = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech Recognition API not supported!');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const currentTranscript = Array.from(event.results)
                .map((result: SpeechRecognitionResultList) => result[0])
                .map((result: SpeechRecognitionResult) => result.transcript)
                .join('');
            setTranscript(currentTranscript);
        };

        if (isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        };
    }, [isListening]);

    return { transcript, isListening, setIsListening, setTranscript };
};