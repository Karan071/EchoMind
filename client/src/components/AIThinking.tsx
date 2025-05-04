import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  liveTranscript: string;
  isListening: boolean;
}

const AIThinking: React.FC<Props> = ({ liveTranscript, isListening }) => {
  // Brain wave animation
  const waves = Array.from({ length: 5 }, (_, i) => i);
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-64 h-64 mb-8">
        {/* Glowing orb background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-20 animate-pulse blur-xl"></div>
        
        {/* Brain waves animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          {waves.map((i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full rounded-full border-2 border-purple-500/30"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ 
                scale: [0.5, 1.5, 0.5],
                opacity: [0.8, 0, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Center robot icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            className="w-20 h-20 text-white" 
            viewBox="0 0 24 24" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2C11.45 2 11 2.45 11 3V4H13V3C13 2.45 12.55 2 12 2ZM18 4H6C4.34 4 3 5.34 3 7V15C3 16.66 4.34 18 6 18H9L8 19H6C5.45 19 5 19.45 5 20C5 20.55 5.45 21 6 21H18C18.55 21 19 20.55 19 20C19 19.45 18.55 19 18 19H16L15 18H18C19.66 18 21 16.66 21 15V7C21 5.34 19.66 4 18 4ZM19 15C19 15.55 18.55 16 18 16H6C5.45 16 5 15.55 5 15V7C5 6.45 5.45 6 6 6H18C18.55 6 19 6.45 19 7V15ZM8 9C7.45 9 7 9.45 7 10C7 10.55 7.45 11 8 11C8.55 11 9 10.55 9 10C9 9.45 8.55 9 8 9ZM16 9C15.45 9 15 9.45 15 10C15 10.55 15.45 11 16 11C16.55 11 17 10.55 17 10C17 9.45 16.55 9 16 9ZM12 12C10.9 12 10 12.9 10 14H14C14 12.9 13.1 12 12 12Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Transcript display */}
      <div className="text-center mt-8 w-4/5 mx-auto">
        {isListening && liveTranscript ? (
          <div className="bg-purple-800/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg max-w-lg mx-auto transition-all duration-300 ease-in-out">
            <p className="text-sm font-semibold text-white/90 mb-1">You:</p>
            <p className="text-lg">{liveTranscript} <span className="ml-1 inline-block w-2 h-5 bg-white animate-blink"></span></p>
          </div>
        ) : (
          <div className="text-center text-white/80">
            <p className="text-xl font-medium mb-2">AI Assistant Ready</p>
            <p className="text-sm opacity-75">Start speaking to begin the conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIThinking; 