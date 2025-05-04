import Logo from "../../assets/Cubekit-logo.png";

const footerLinks = [
    { href: "#", label: "Contact" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms & Conditions" },
];

export default function Footer() {
    return <section className="py-16 font-oswald bg-gradient-to-b from-[#2d004d] to-[#000]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:justify-between">
                <div>
                    <img
                        src={Logo}
                        alt={`layers ${Logo}`}
                        className="w-16 md:w-20"
                    />
                </div>
                <div>
                    <nav className="flex flex-col md:flex-row gap-4 md:gap-6 text-center">
                        {footerLinks.map((link) => (
                            <a  
                                key={link.label}
                                href={link.href}
                                className="text-white text-sm md:text-md hover:text-gray-300 transition-colors"
                                >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    </section>;
}