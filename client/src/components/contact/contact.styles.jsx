import Image from "next/image";
import tw from "tailwind-styled-components";

export const ContactContainer = tw.div`
    flex  justify-center lg:justify-end
    w-full h-full
    
    
`;

export const ContactAvatar = tw(Image)`
    
`;

export const ContactForm = tw.form`
    space-y-4 
    w-[90vw] lg:w-[25vw]
    bg-white 
    p-4 md:p-8
    rounded-lg 
    shadow-xl
    shadow-slate-400
`;

export const ContactHeader = tw.section`
    flex
    items-center
    justify-between md:justify-start 
    gap-4 
`;

export const FormInput = tw.input`
    w-full 
    p-3 
    border 
    rounded-md 
    border-slate-400
`;

export const FormTextarea = tw.textarea`
    w-full 
    p-3 
    border 
    rounded-md 
    resize-none 
    border-slate-400
`;

export const FormButton = tw.button`
    p-3 
    text-white 
    uppercase 
    rounded-lg 
    bg-[var(--clr-body-secondary)]
    hover:opacity-90
    active:scale-95
    disabled:cursor-not-allowed
    disabled:pointer-events-none
    disabled:opacity-30
`;
