import { Dot, Download } from 'lucide-react';
import React from 'react';

interface Props {
    mediaBlobUrl: string | null;
    isRecording: boolean;
    hasAIResponse?: boolean;
}

const Recorder: React.FC<Props> = ({ mediaBlobUrl, isRecording, hasAIResponse = false }) => {
    return (
        <div className="text-center my-4 flex gap-6">
            <div>
                {isRecording && (
                    <div className="flex items-center gap-2 bg-[#9937df] text-white py-2 px-4 rounded-full border-2 border-white/50 shadow-lg animate-pulse">
                        <span className="text-red-400 animate-blink"><Dot size={24} /></span>
                        <span className="font-oswald">{hasAIResponse ? "Recorded" : "Recording..."}</span>
                    </div>
                )}
            </div>
            <div>
                {mediaBlobUrl && (
                    <a
                        href={mediaBlobUrl}
                        download="session_recording.webm"
                        className="bg-[#1a0033e0] hover:bg-[#9937df] border-white/50 border-2 text-white py-2 px-6 rounded-full inline-flex items-center gap-2 font-oswald transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        <Download className="w-5 h-5" />
                        <span>Download Session</span>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Recorder;