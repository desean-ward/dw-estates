import Link from "next/link";
import tw from "tailwind-styled-components";

export const SignInWrapper = tw.div`
    min-h-[78.5vh]
    w-screen
    bg-[url('https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]
    flex flex-col 
    justify-center
    bg-cover
    overflow-hidden
`;

export const SignInContainer = tw.div`
    w-full
    max-w-lg
    mx-auto
    shadow-xl shadow-slate-900
    p-8 pt-0
    rounded-lg
    border
    bg-white
`;

export const SignInForm = tw.form`
    flex flex-col gap-4
`;

export const SignInInput = tw.input`
    border border-slate-400
    p-3
    rounded-lg
`;

export const SignInButton = tw.button`
    ${(props) =>
      props.$google ? "bg-google" : "bg-[var(--clr-body-secondary)]"}
    text-white 
    p-3
    rounded-lg 
    uppercase 
    hover:opacity-95 
`;

export const SignUpSection = tw.section`
    flex gap-2 justify-center
    mt-5
`;

export const SignUpLink = tw(Link)`
    font-semibold 
    hover:text-[var(--clr-text-accent)]
`;
