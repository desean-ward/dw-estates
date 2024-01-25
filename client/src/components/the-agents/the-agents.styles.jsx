import Image from "next/image";
import tw from "tailwind-styled-components";
import { motion } from "framer-motion";

export const AgentsContainer = tw.div`
    flex 
    flex-col
    items-center
    w-full
    my-7
    px-2
`;

export const AgentsSection = tw(motion.section)`
    flex 
    flex-wrap 
    justify-center 
    w-full 
    gap-4 
    lg:flex-nowrap 
    lg:gap-8 max-w-7xl
`;

export const AgentCard = tw(motion.section)`
    flex 
    flex-col
    items-center
    w-full
    max-w-[90vw] sm:max-w-[380px] lg:max-w-[275px]
    p-16
    gap-4
    mt-8
    border border-slate-400
    rounded-lg
    py-4
`;

export const AgentAvatarContainer = tw.div`
    w-36 h-36
    bg-slate-700
    rounded-full
    overflow-hidden
`;

export const AgentAvatar = tw(Image)`
    w-48 
    h-48
    object-cover
`;
