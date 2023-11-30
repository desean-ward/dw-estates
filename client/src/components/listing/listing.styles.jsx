import tw from "tailwind-styled-components";

export const ListingContainer = tw.div`
   
    
`;

export const ListingContent = tw.div`
   
`;

export const ListingCarousel = tw.div`
    relative
    w-screen
`;

export const ImageContainer = tw.section`
    h-[400px]
    
    
`;

export const Image = tw.img`
    h-full
    w-full
    object-cover
`;

export const CopyImageUrl = tw.section`
    fixed 
    top-[13%] 
    right-[3%] 
    z-10 
    border 
    rounded-full 
    w-12 h-12 
    flex justify-center items-center bg-slate-100 
    cursor-pointer
`;

export const AddToFavorites = tw.section`
    
    flex justify-center items-center gap-2
`;

export const ListingTitle = tw.section`
    flex 
    flex-col
    gap-2
    items-start
    py-3 
    mx-auto 
    mt-7
`;

export const ListingAddress = tw.p`
    flex 
    items-center gap-2 
    mb-8
    text-sm 
    text-slate-600
`;

export const RentOrSell = tw.p`
    w-full 
    bg-red-900 
    max-w-[200px] 
    text-white 
    text-center 
    p-2 
    rounded-md
`;

export const ListingOffer = tw.p`
    bg-green-900 
    w-full 
    max-w-[200px] 
    flex
    justify-center items-center
    gap-2
    text-white text-center 
    p-2 
    rounded-md
`;

export const ListingDetails = tw.ul`
    flex 
    flex-wrap 
    items-center 
    gap-8 
    text-sm 
    font-semibold
`;
export const Detail = tw.li`
    flex 
    items-center 
    gap-2
    whitespace-nowrap
`;
