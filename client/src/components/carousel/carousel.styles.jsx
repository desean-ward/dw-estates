import Image from "next/image";
import tw from "tailwind-styled-components";

export const CarouselContainer = tw.div` 
    ${({ type }) => type !== "listing" && "relative bottom-0"}
    w-screen 
`;

export const ImageContainer = tw.section`
    h-[350px] md:h-[450px]
`;

export const PropertyImage = tw(Image)`
    object-cover 
    w-full 
    h-full 
`;

export const CopyImageUrl = tw.section`
    top-[13%] 
    right-[3%] 
    z-10 
    border 
    rounded-full 
    w-12 h-12 
    flex justify-center items-center bg-slate-100 
    cursor-pointer
`;
