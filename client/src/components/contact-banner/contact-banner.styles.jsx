import tw from "tailwind-styled-components";
import { motion } from "framer-motion";

export const BannerContainer = tw(motion.div)`
    mt-16
    w-full
    bg-[var(--clr-text-accent)]
    text-white
    text-center
    px-12 py-24
`;

export const ContactButton = tw.div`
    w-max
    border-2 
    rounded-lg
    mx-auto
    text-2xl
    mt-8
    p-4
    cursor-pointer
    hover:shadow-xl
    active:shadow-inner
    hover:opacity-80
    
`