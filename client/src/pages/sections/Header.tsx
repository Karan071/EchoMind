import { BackgroundBeams } from "../../components/ui/background-beams";
import Typewriter from "typewriter-effect";

const cardData = [
    { title: "Voice-Driven", description: "Speak naturally — EchoMind captures your input in real time using cutting-edge voice recognition." },
    { title: "AI-Powered Responses", description: "Your questions are understood and answered by a smart AI system that learns and evolves." },
    { title: "Session History", description: "Every interaction is recorded and stored for future reference, so you never lose a thought." }
];


export default function Header() {
    return <section>
        <div className="min-h-screen h-screen bg-gradient-to-b from-[#1a0033] via-[#2d004d] to-[#000000] relative overflow-hidden font-oswald">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] bg-[#b600f4] opacity-30 rounded-full blur-[150px] z-0"></div>


            <div className="relative z-10 h-full mt-5">
                <section className="font-oswald flex flex-col items-center justify-center px-4 py-8 h-full">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-6 leading-tight font-inter">
                        Echo<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">Mind</span>
                    </h1>

                    <p className="text-md md:text-2xl text-gray-300 text-center max-w-2xl mb-10">
                        <Typewriter
                            options={{
                                strings: [
                                    "EchoMind is your AI-powered voice assistant that captures your thoughts, understands your questions, and responds intelligently — all while recording every session for later use."
                                ],
                                autoStart: true,
                                loop: false,
                                delay: 40,
                                deleteSpeed: Infinity,
                                cursor: "|"
                            }}
                        />
                    </p>

                    <a
                        href="/main-page"
                        className="font-inter bg-gradient-to-r from-purple-900 to-purple-500 text-white font-semibold py-1 md:py-3 px-3 md:px-8 rounded-[30px] shadow-xl text-sm md:text-lg transition duration-300 ease-in-out transform hover:scale-105 border-2 hover:border-white"
                    >
                        Start Now
                    </a>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-8 md:mt-16 mx-auto px-4 sm:px-0">
                        {cardData.map((card, i) => (
                            <div key={i} className="p-4 sm:p-6 bg-white/90 rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-300 w-full md:max-w-xs hover:scale-105 border-purple-900 border-2 md:border-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-500 mb-2 sm:mb-3">
                                    {card.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 font-inter">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </section>
            </div>
            <BackgroundBeams />
        </div>
    </section>
}