import tw from "tailwind-styled-components";

export const FooterContainer = tw.footer`
    relative
    bottom-0
`;

export const FooterContent = tw.div`
    flex 
    flex-col
    items-center
    w-full 
    max-w-7xl
    mx-auto
`;

export const FooterCopyright = tw.section`

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
