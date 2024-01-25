import tw from "tailwind-styled-components";
import { motion } from "framer-motion";

export const HeroContainer = tw.div`
    w-screen
    h-screen
    grid grid-rows-2
`;

export const HeroContent = tw.div`
    w-fit
    max-w-7xl
    mx-auto
    px-4 md:px-8
    flex flex-col lg:flex-row
    justify-center lg:items-center
    gap-4 md:gap-8
`;

export const LeftSection = tw(motion.section)`
    w-full
`;
export const RightSection = tw(motion.section)`
    w-full
`;
