import Link from "next/link";
import tw from "tailwind-styled-components";

export const SignUpWrapper = tw.div`
absolute top-0 left-0
h-screen
w-screen
bg-[url('https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]

bg-cover
overflow-hidden

`;

export const SignUpContainer = tw.div`
   max-w-lg
   mx-auto
   translate-y-1/2
   shadow-xl shadow-slate-900
   p-8 pt-0
   rounded-lg
   border
   bg-white
`;

export const SignUpForm = tw.form`
    flex flex-col gap-4
`;

export const RoleSelect = tw.select`
    p-3
    bg-white
    text-slate-700
    border border-slate-400
    rounded-lg
    cursor-pointer
`;

export const RoleOption = tw.option`
    bg-white 
    text-[--clr-body-secondary]
    cursor-pointer
    p-3
`;

export const SignUpInput = tw.input`
    border border-slate-400
    p-3
    rounded-lg
`;

export const SignUpButton = tw.button`
    ${(props) => (props.$google ? "bg-google" : "bg-[var(--clr-body-secondary)]")}
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

export const SignInLink = tw(Link)`
    font-semibold 
    hover:text-[var(--clr-text-accent)]
`;
