import React from 'react';

interface Props {
    response: string;
    loading: boolean;
    conversation: { role: string; content: string }[];
    liveTranscript: string;
    isListening: boolean;
}

const AIResponse: React.FC<Props> = ({ response, loading, conversation, liveTranscript, isListening }) => {
    const [displayedResponse, setDisplayedResponse] = React.useState('');
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const conversationRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!loading && response) {
            setDisplayedResponse('');
            setCurrentIndex(0);
            const typingInterval = setInterval(() => {
                setCurrentIndex(prev => {
                    if (prev < response.length) {
                        setDisplayedResponse(response.substring(0, prev + 1));
                        return prev + 1;
                    } else {
                        clearInterval(typingInterval);
                        return prev;
                    }
                });
            }, 20);

            return () => clearInterval(typingInterval);
        }
    }, [loading, response]);

    React.useEffect(() => {
        if (loading) {
            setDisplayedResponse('');
            setCurrentIndex(0);
        }
    }, [loading]);

    // Scroll to bottom when new messages are added
    React.useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, [conversation, displayedResponse]);

    // Function to get the message content based on message position
    const getMessageContent = (msg: { role: string; content: string }, index: number) => {
        // For the last user message that's currently being typed
        if (msg.role === 'user' && index === conversation.length - 1 && isListening && msg.content === '') {
            return liveTranscript || 'Listening...';
        }
        
        // For the last AI message that's being typed out
        if (msg.role === 'assistant' && index === conversation.length - 1 && currentIndex < response.length) {
            return displayedResponse;
        }
        
        // For all other messages
        return msg.content;
    };

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 w-full h-full flex flex-col shadow-xl border border-purple-500/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                    Conversation
                </h2>
                
                {loading ? (
                    <div className="flex items-center justify-center flex-grow">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="flex space-x-2">
                                {[...Array(3)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className="w-4 h-4 rounded-full bg-purple-400"
                                        style={{
                                            animation: `bounce 1.4s infinite ease-in-out both`,
                                            animationDelay: `${i * 0.16}s`
                                        }}
                                    ></div>
                                ))}
                            </div>
                            <p className="text-xl font-medium text-white/80">Processing your request...</p>
                        </div>
                    </div>
                ) : (
                    <div 
                        ref={conversationRef}
                        className="space-y-6 flex-grow overflow-y-auto pr-4 custom-scrollbar"
                    >
                        {conversation.map((msg, index) => (
                            // Don't display empty messages
                            msg.content !== '' || (msg.role === 'user' && index === conversation.length - 1 && isListening) ? (
                                <div 
                                    key={index} 
                                    className={`${
                                        index === conversation.length - 1 ? 'animate-fadeIn' : ''
                                    }`}
                                >
                                    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div 
                                            className={`max-w-[85%] p-4 rounded-2xl shadow-lg transform transition-all duration-300 ${
                                                msg.role === 'user' 
                                                    ? 'bg-purple-800/90 backdrop-blur-sm text-white border border-purple-600/50' 
                                                    : 'bg-gradient-to-r from-purple-600/90 to-indigo-600/90 backdrop-blur-sm text-white border border-purple-500/50'
                                            }`}
                                        >
                                            <div className="flex items-center mb-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                                                    msg.role === 'user' ? 'bg-purple-600' : 'bg-indigo-600'
                                                }`}>
                                                    {msg.role === 'user' ? (
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                                        </svg>
                                                    )}
                                                </div>
                                                <p className="font-semibold text-white/90">
                                                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                                                </p>
                                            </div>
                                            <p className="text-lg whitespace-pre-line leading-relaxed">
                                                {getMessageContent(msg, index)}
                                                {/* Show typing indicator for current messages */}
                                                {((msg.role === 'assistant' && index === conversation.length - 1 && currentIndex < response.length) ||
                                                  (msg.role === 'user' && index === conversation.length - 1 && isListening)) && (
                                                    <span className="ml-1 inline-block w-2 h-5 bg-white animate-blink" />
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))}
                        
                        {/* Add extra space at the bottom for better scrolling */}
                        {conversation.length > 0 && <div className="h-4"></div>}
                    </div>
                )}

                {/* Empty state */}
                {conversation.length === 0 && !loading && (
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-white/80">
                        <div className="mb-6">
                            <svg className="w-20 h-20 mx-auto text-purple-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium mb-2">No Conversation Yet</h3>
                        <p className="text-sm opacity-75 max-w-sm">Your conversation will appear here. Start speaking to ask the AI a question.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIResponse;