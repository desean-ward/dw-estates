import tw from "tailwind-styled-components";
import { FaRegWindowClose } from "react-icons/fa";

export const GalleryImageContainer = tw.div`
    fixed
    z-50
    inset-0
    flex 
    flex-col
    justify-center
    items-center
    bg-slate-900/40
`;

export const ImageContent = tw.div`
    flex
    flex-col
    justify-center
    items-center
    max-w-6xl
    
    bg-white
    rounded-2xl
    shadow-xl shadow-slate-900
    mb-4
`;

export const GalleryImage = tw.img`
    w-full
    h-full
    border-2
    bg-white
    
    
`;

export const CloseButtonContainer = tw.div`
    w-full
    flex
    justify-end
`;

export const CloseButton = tw(FaRegWindowClose)`
    absolute
    cursor-pointer 
    m-2
    text-white
    hover:text-slate-400
    active:text-slate-600
    bg-[--clr-body-secondary] 
    shadow-md shadow-slate-900
    
`;
