import { motion } from "framer-motion";
import { Fragment } from "react";

import ikigaiLabsLogo from "../../assets/logo/Ikigai Labs.svg";
import lightspeedLogo from "../../assets/logo/Lightspeed.svg";
import luminaryLogo from "../../assets/logo/Luminary.svg";
import mastermailLogo from "../../assets/logo/Mastermail.svg";
import norseStarLogo from "../../assets/logo/Norse Star.svg";
import pictelAILogo from "../../assets/logo/PictelAI.svg";
import shutterframeLogo from "../../assets/logo/Shutterframe.svg";
import voxelLabsLogo from "../../assets/logo/Voxel Labs.svg";
import warpspeedLogo from "../../assets/logo/Warpspeed.svg";
import watchtowerLogo from "../../assets/logo/Watchtower.svg";


const logos = [
    { name: "Ikigai Labs", image: ikigaiLabsLogo },
    { name: "Lightspeed", image: lightspeedLogo },
    { name: "Luminary", image: luminaryLogo },
    { name: "Mastermail", image: mastermailLogo },
    { name: "Norse Star", image: norseStarLogo },
    { name: "PictelAI", image: pictelAILogo },
    { name: "Shutterframe", image: shutterframeLogo },
    { name: "Voxel Labs", image: voxelLabsLogo },
    { name: "Warpspeed", image: warpspeedLogo },
    { name: "Watchtower", image: watchtowerLogo },
];

export default function LogoTicker() {
    return (
        <section className="overflow-x-clip font-oswald">
            <div className="bg-gradient-to-b from-[#000000] to-[#000] py-10 md:py-20">
                <h3 className="text-center font-bold text-md md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-200">
                    Partnered with the Best in the Business
                </h3>
                <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        animate={{
                            x: "-50%",
                        }}
                        transition={{
                            duration: 30,
                            ease: 'linear',
                            repeat: Infinity
                        }}
                        className="flex flex-none gap-24 pr-24"
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Fragment key={i}>
                                {logos.map((logo) => (
                                    <img
                                        src={logo.image}
                                        alt={logo.name}
                                        key={logo.name}
                                    />
                                ))}
                            </Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}