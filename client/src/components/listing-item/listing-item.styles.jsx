import tw from "tailwind-styled-components";

export const ListingItemContainer = tw.div`
    w-[90vw] sm:w-[380px]
    h-full
    flex flex-col
    justify-between
    border border-slate-400
    shadow-md hover:shadow-xl hover:shadow-slate-800 
    transition duration-500 ease-in-out
    rounded-lg
    group
`;

export const ListingImageContainer = tw.section`
    w-full
    h-[200px]
    border border-slate-400
    transition duration-[1s] ease-in-out
    overflow-hidden 
    mx-auto
`;

export const ListingImage = tw.img`
    object-cover 
    w-full h-full
    group-hover:scale-[120%]
    transition duration-[1s] ease-in-out
`;
