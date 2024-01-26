import Link from "next/link";
import tw from "tailwind-styled-components";

export const FooterContainer = tw.footer`
    relative
    bottom-0
    pt-16
`;

export const FooterContent = tw.div`
    flex 
    flex-col
    items-center
    gap-8
    w-full 
    max-w-7xl
    mx-auto
`;

export const FooterTopSection = tw.div`
    flex 
    flex-col md:flex-row
    gap-8
`;

export const Left = tw.section`
    w-full
    px-4
`;

export const Middle = tw.section`
    w-full
    flex flex-col
    gap-2
    px-4
    text-white
`;

export const Right = tw.section`
    w-full
    px-4
`;

export const InfoField = tw.section`
    flex
    items-center
    gap-2
    my-2
`;

export const InfoIcon = tw.section`
    w-6 h-6
`;

export const InfoText = tw.section`
    w-full
`;

export const FooterCopyright = tw.section`
    w-full
    flex 
    flex-col-reverse md:flex-row
    justify-between
    text-center md:text-left
    pb-8
`;

export const SocialIconsContainer = tw.section`
    flex 
    my-4
`;

export const SocialIcon = tw.section`
    w-8 h-8
    flex justify-center items-center
    rounded-full
    bg-slate-100
    hover:bg-slate-300
    cursor-pointer
    transition
    duration-200
    ease-in-out
    mx-2
    cursor-pointer
`;
