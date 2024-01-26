import tw from "tailwind-styled-components";

export const ListingContainer = tw.div`
   min-h-[82vh]
    
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

export const InfoAndGallery = tw.div`
    flex 
    flex-col 
    lg:flex-row 
    justify-between 
    w-full 
    max-w-7xl
    gap-8 
    px-8 
    mx-auto 
`;
export const ListingInfo = tw.section`
    flex
    flex-col
    grow
    items-center md:items-start
`;

export const ListingTitle = tw.section`
    flex 
    flex-col
    gap-2
    items-start
    text-center md:text-left
    pb-3 
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
    justify-center md:justify-start
    gap-8 
    text-sm 
    font-semibold
    border-2
    rounded-lg
    p-4
`;
export const Detail = tw.li`
    flex 
    items-center 
    gap-2
    whitespace-nowrap
`;

export const ListingGallery = tw.section`
    w-full
    h-full
    flex
    flex-col
    flex-wrap
    justify-center
    items-center
    gap-8
    mt-8
    mb-16 
    pointer-events-none
    lg:pointer-events-auto
`;

export const GalleryImage = tw.img`
    w-full
    lg:max-w-[300px]
    lg:max-h-[100px]
    object-cover
    rounded-lg
    cursor-pointer
    ml-auto
    hover:opacity-50
    
`;
