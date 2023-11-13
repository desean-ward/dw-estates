import Image from "next/image";
import tw from "tailwind-styled-components";

export const AgentsContainer = tw.div`
    flex 
    flex-col
    w-full
    max-w-7xl
    mx-auto
    my-7
`;

export const AgentsSection = tw.section`
    flex
    gap-8
    w-full 
    max-w-7xl
`;
export const AgentCard = tw.section`
    flex 
    flex-col
    items-center
    w-[400px] 
    gap-4
    mt-8
    border border-slate-400
    rounded-lg
    py-4
`;

export const AgentAvatarContainer = tw.div`
    w-48
    h-48
    bg-slate-700
    rounded-full
    overflow-hidden
`;

export const AgentAvatar = tw(Image)`
    w-full 
    h-full
    object-cover
`;
