import tw from "tailwind-styled-components";

export const ListingContainer = tw.div`
   
    
`;

export const ListingContent = tw.div`
`;

export const ListingCarousel = tw.div`
    relative
    w-screen
    -left-[10vw]
`;

export const ImageContainer = tw.section`
    h-[450px]
    
    
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

export const ListingTitle = tw.section`
    gap-4 
    py-3 
    mx-auto 
    my-7
`;

export const ListingAddress = tw.p`
    flex 
    items-center gap-2 
    my-2 mt-6 
    text-sm 
    text-slate-600
`;

export const RentOrSale = tw.p`
    w-full 
    bg-red-900 
    max-w-[200px] 
    text-white 
    text-center 
    p-1 
    rounded-md
`;

export const ListingOffer = tw.p`
    bg-green-900 
    w-full 
    max-w-[200px] 
    text-white text-center 
    p-1 
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
