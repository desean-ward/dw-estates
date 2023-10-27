import Link from "next/link";
import tw from "tailwind-styled-components";

export const HeaderContainer = tw.header`
    sticky 
    top-0
    w-full 
    
    
    shadow-md
    p-4
    `;

export const HeaderContent = tw.div`
    max-w-6xl
    flex justify-between items-center
    mx-auto
`;

export const LogoContainer = tw.div`
    flex gap-2
`;

export const Logo = tw.section``;

export const LogoLink = tw(Link)``;

export const LogoImage = tw.img``;

export const SearchContainer = tw.form`
    bg-slate-100
    p-3
    rounded
    flex items-center gap-2
`;

export const SearchInput = tw.input`
    bg-transparent
    border-none
    outline-none 
    w-24 sm:w-64
`;

export const NavContainer = tw.section``;

export const Nav = tw.nav``;

export const NavList = tw.ul`
    flex items-center gap-4
`;

export const NavItem = tw.li`
   
    hover:text-slate-800
    cursor-pointer
    transition
    duration-200
    ease-in-out
`;

export const NavLink = tw(Link)``;

export const AvatarContainer = tw.section`
    w-10 h-10
    flex items-center justify-center
    border-2 border-slate-500
    rounded-full
    overflow-hidden
`;
