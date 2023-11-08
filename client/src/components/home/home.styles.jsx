import tw from "tailwind-styled-components";

export const HomeContainer = tw.div`
    flex flex-col 
    gap-4 
    pb-16
`;

export const ListingsContainer = tw.section`
    flex flex-col 
    w-full 
    gap-16 
    px-4 
    mx-auto 
    max-w-7xl
`;

export const PropertiesSection = tw.section`
    flex 
    flex-col
    w-full 
    gap-4
    mt-8
`;

export const PropertiesSectionHeader = tw.section`
    flex 
    flex-col 
`

export const Properties = tw.div`
    flex 
    flex-wrap 
    justify-center sm:justify-start
    gap-4 
`;
