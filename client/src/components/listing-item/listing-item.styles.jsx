import tw from "tailwind-styled-components";

export const ListingItemContainer = tw.div`
    w-[90vw] sm:w-[380px]
    flex flex-col
    gap-4
    border border-slate-400
    shadow-md hover:shadow-xl hover:shadow-slate-800 
    transition duration-500 ease-in-out
    rounded-lg
    p-4
    group
`;

export const ListingImageContainer = tw.section`
    w-full
    rounded-lg
    border border-slate-400
    transition duration-[1s] ease-in-out
    overflow-hidden 
    mx-auto
`;

export const ListingImage = tw.img`
    object-cover
    group-hover:scale-[120%]
    transition duration-[1s] ease-in-out
`;
