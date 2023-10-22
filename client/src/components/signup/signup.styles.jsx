import Link from "next/link";
import tw from "tailwind-styled-components";

export const SignUpContainer = tw.div`
   p-3
   max-w-lg
   mx-auto
`;

export const SignUpForm = tw.form`
    flex flex-col gap-4
`;

export const SignUpInput = tw.input`
    border 
    p-3
    rounded-lg
`;

export const SignUpButton = tw.button`
    ${(props) => (props.$google ? "bg-google" : "bg-slate-700")}
    text-white 
    p-3
    rounded-lg 
    uppercase 
    hover:opacity-95 
    
    `;

export const SignInSection = tw.section`
    flex gap-2 justify-center
    mt-5
`;

export const SignInLink = tw(Link)``;
