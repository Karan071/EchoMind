import { useEffect, useRef, useState } from 'react';

const CameraView = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [cameraActive, setCameraActive] = useState(false);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCameraActive(true);
                }
            } catch (error) {
                console.error(error);
                // Don't show alert, just log the error
                setCameraActive(false);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="relative w-full h-full">
            <div className="overflow-hidden rounded-xl w-full h-full shadow-lg border-2 border-purple-500/30 backdrop-blur-sm bg-black/40">
                {!cameraActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70">
                        <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className="text-lg font-medium">Camera initializing...</p>
                    </div>
                )}
                <video 
                    ref={videoRef} 
                    autoPlay 
                    muted 
                    className={`w-full h-full object-cover transform ${cameraActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} 
                />
                
                {/* Camera overlay effects */}
                <div className="absolute inset-0 rounded-xl pointer-events-none">
                    {/* Border glow effect */}
                    <div className="absolute inset-0 rounded-xl border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"></div>
                    
                    {/* Corner elements */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/70 rounded-tl-xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500/70 rounded-tr-xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500/70 rounded-bl-xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/70 rounded-br-xl"></div>
                </div>
                
                {/* Recording indicator */}
                <div className="absolute top-3 right-3 flex items-center bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-blink"></span>
                    <span className="text-white/90 text-xs ml-2">LIVE</span>
                </div>
            </div>
        </div>
    );
};

export default CameraView;