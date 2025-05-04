import logo from "../assets/Cubekit-logo.png"
export default function Navbar() {
    return <div className="absolute z-30 flex justify-center items-center w-full">
        <nav className="flex justify-between items-center w-full max-w-[1500px] px-8">
            <img src={logo} alt="logo" className="w-15 md:w-25" />
            <a
                href="/main-page"
                className="font-inter bg-gradient-to-r from-purple-900 to-purple-500 text-white font-semibold py-1 md:py-3 px-2 md:px-8 rounded-[30px] shadow-xl text-sm md:text-lg transition duration-300 ease-in-out transform hover:scale-105 border-2 hover:border-white"
            >
                Get Started
            </a>
        </nav>
    </div>
}