import tw from "tailwind-styled-components";

export const HeroContainer = tw.div`
    w-screen
    h-screen
    grid grid-rows-2
    
`;

export const HeroContent = tw.section`
    w-fit
    max-w-7xl
    mx-auto
    flex flex-col justify-center gap-8
    -mt-8
`;
