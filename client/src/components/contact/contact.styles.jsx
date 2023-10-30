import tw from "tailwind-styled-components";

export const ContactContainer = tw.div`
    fixed 
    top-0 left-0 
    z-50 
    flex items-center justify-center 
    w-screen h-screen 
    overflow-hidden 
    bg-slate-800/80
`;

export const ContactForm = tw.form`
    space-y-4 
    w-[90vw] md:w-[30vw] 
    mx-auto 
    bg-white 
    p-8 
    rounded-lg 
    shadow-xl 
    shadow-slate-900
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
    w-full 
    p-3 
    text-white 
    uppercase 
    rounded-lg 
    bg-slate-700 
    hover:opacity-95
`;
