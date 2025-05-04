import Navbar from "../components/Navbar";
import Faq from "./sections/Faqs";
import CallToAction from "./sections/Cta";
import Footer from "./sections/Footer";
import LogoTicker from "./sections/LogoTicker";
import Header from "./sections/Header";

export default function LandingPage() {
    return (
        <div>
            <Navbar />
            <Header/>
            <LogoTicker/>
            <Faq/>
            <CallToAction/>
            <Footer/>
        </div>
    );
}


