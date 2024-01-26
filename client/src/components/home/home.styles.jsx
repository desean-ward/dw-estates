import tw from "tailwind-styled-components";

export const HomeContainer = tw.div`
    flex flex-col 
    gap-4 
`;

export const ListingsContainer = tw.section`
    flex flex-col 
    items-center
    gap-16 
    w-full
    max-w-7xl
    mx-auto
    px-4 
    mb-16
`;

export const PropertiesSection = tw.section`
    flex 
    flex-col
    w-full 
    gap-4
    lg:mt-8
`;

export const PropertiesSectionHeader = tw.section`
    flex 
    flex-col md:flex-row
    justify-between
    items-center
`;

export const Properties = tw.div`
    flex 
    flex-wrap 
    justify-center sm:justify-start
    gap-4 
`;
