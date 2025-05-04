import { useState, useEffect } from 'react';
import CameraView from '../components/CameraView';
import Recorder from '../components/Recorder';
import AIResponse from '../components/AIResponse';
import AIThinking from '../components/AIThinking';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useRecorder } from '../hooks/useRecorder';
import mic from "../assets/mic.png"
import cube from "../assets/Cubekit-logo.png"


export default function Content() {
    const { transcript, isListening, setIsListening, setTranscript } = useSpeechRecognition();
    const { startRecording, stopRecording, mediaBlobUrl } = useRecorder();
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState<{ role: string; content: string }[]>([]);
    const [liveTranscript, setLiveTranscript] = useState('');

    useEffect(() => {
        if (isListening && transcript) {
            const capitalizedTranscript = transcript.charAt(0).toUpperCase() + transcript.slice(1);
            setLiveTranscript(capitalizedTranscript);
        }
    }, [transcript, isListening]);

    const handleStart = () => {
        console.log('Starting recording...');
        setIsListening(true);
        startRecording();
        // Add an empty user message that will be updated as they speak
        if (conversation.length === 0 || conversation[conversation.length - 1].role !== 'user') {
            setConversation(prev => [
                ...prev,
                { role: 'user', content: '' }
            ]);
        }
    }

    const handleSubmit = async () => {
        console.log('Submitting...');
        if (!transcript.trim()) {
            console.log('No transcript to submit');
            return;
        }
        
        setIsListening(false);
        setLoading(true);
        await stopRecording();
        
        // Capitalize the first letter of the transcript
        const capitalizedTranscript = transcript.charAt(0).toUpperCase() + transcript.slice(1);
        console.log('Transcript:', capitalizedTranscript);
        
        try {
            // Update the last user message with the final transcript
            let updatedConversation = [...conversation];
            if (updatedConversation.length > 0 && updatedConversation[updatedConversation.length - 1].role === 'user') {
                updatedConversation[updatedConversation.length - 1].content = capitalizedTranscript;
            } else {
                updatedConversation = [...updatedConversation, { role: 'user', content: capitalizedTranscript }];
            }
            
            setConversation(updatedConversation);

            const response = await fetch('http://localhost:8010/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    transcript: capitalizedTranscript,
                    conversation: updatedConversation // Send updated conversation history
                }),
            });

            const data = await response.json();
            setConversation([...updatedConversation, { role: 'assistant', content: data.aiResponse }]);
            setAiResponse(data.aiResponse);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setAiResponse('Sorry, there was an error processing your request.');
            setConversation([
                ...conversation,
                { role: 'assistant', content: 'Sorry, there was an error processing your request.' }
            ]);
        } finally {
            setLoading(false);
            setLiveTranscript('');
            // Clear the transcript to prevent previous questions from being picked up
            setTranscript('');
            setIsListening(true); // Keep recording on
            startRecording(); // Restart recording for next input
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 h-screen bg-gradient-to-b from-[#1a0033e0] via-[#9937df] to-[#000000] relative overflow-hidden font-oswald">
            {/* Header Section */}
            <header className='flex items-center justify-between mx-auto mb-8 px-6 max-w-7xl'>
                <div className="flex items-center">
                    <img src={cube} alt="AI Logo" className="h-16 w-16 filter drop-shadow-lg animate-pulse" />
                </div>
                <h1 className="text-6xl text-white font-bold tracking-wider bg-clip-text bg-gradient-to-r from-purple-400 to-white text-transparent drop-shadow-lg">
                    Ask the AI
                </h1>
                <div>
                    <Recorder 
                        mediaBlobUrl={mediaBlobUrl} 
                        isRecording={isListening} 
                        hasAIResponse={conversation.some(msg => msg.role === 'assistant')}
                    />
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-row h-[80vh] gap-6 mx-auto max-w-7xl">
                {/* Left Section */}
                <div className="w-1/2 flex flex-col gap-6 h-full">
                    <div className="flex-grow">
                        {conversation.length === 0 && !loading ? (
                            <AIThinking liveTranscript={liveTranscript} isListening={isListening} />
                        ) : (
                            <CameraView />
                        )}
                    </div>
                    <div className="flex justify-center items-center text-center mt-2 mb-6">
                        {!isListening ? (
                            <button
                                onClick={handleStart}
                                className="bg-black/30 p-4 hover:bg-purple-700/30 rounded-full transition-all duration-500 border-2 border-purple-500/50 shadow-lg group"
                            >
                                <img src={mic} alt="mic" className='h-full w-[60px] transition-transform group-hover:scale-110' />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="bg-purple-600 hover:bg-purple-700 text-white py-4 px-8 rounded-full text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50 border-2 border-purple-400/50 flex items-center gap-2"
                            >
                                <span>Submit Question</span>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
                
                {/* Right Section */}
                <div className="w-1/2 h-full">
                    <AIResponse 
                        response={aiResponse} 
                        loading={loading} 
                        conversation={conversation} 
                        liveTranscript={liveTranscript}
                        isListening={isListening}
                    />
                </div>
            </div>
            
            {/* Particle effects background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-purple-500/10"
                        style={{
                            width: `${Math.random() * 20 + 5}px`,
                            height: `${Math.random() * 20 + 5}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random() * 0.5 + 0.1
                        }}
                    />
                ))}
            </div>
        </div>
    );
}