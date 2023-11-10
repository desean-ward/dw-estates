import Link from "next/link";
import tw from "tailwind-styled-components";
import { motion } from "framer-motion";

export const HeaderContainer = tw.header`
    sticky
    z-50
    top-0
    w-full 
    shadow-md
    shadow-slate-800
    p-4 md:px-8
    `;

export const HeaderContent = tw.div`
    max-w-7xl
    flex justify-between items-center
    mx-auto
    gap-2 md:gap-8
`;

export const LogoContainer = tw.div`
    flex gap-2
`;

export const Logo = tw.section``;

export const LogoLink = tw(Link)``;

export const LogoImage = tw.img``;

export const SearchContainer = tw.form`
    bg-slate-100
    w-full
    max-w-xl
    p-3
    rounded
    flex items-center justify-between gap-2
`;

export const SearchInput = tw.input`
    bg-transparent
    text-black
    border-none
    outline-none 
    w-24 sm:w-64
`;

export const NavContainer = tw.section``;

export const Nav = tw.nav``;

export const NavList = tw.ul`
    flex items-center gap-4
`;

export const NavItem = tw(motion.li)`
   
    hover:text-[var(--clr-text-accent)]
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
    cursor-pointer
`;

export const MenuContainer = tw(motion.aside)`
    absolute
    z-[-50]
    hidden md:flex
    text-lg
    w-[150px]
    bg-[var(--clr-body-secondary)]
    py-8
    shadow-lg
    shadow-slate-800
`;

export const MenuContent = tw(motion.section)`
    flex 
    flex-col 
    items-center 
    w-full h-full 
    gap-2 text-lg  
    translate-y-1/4`;

export const MobileSidebarContainer = tw(motion.aside)`
    fixed
    z-50
    top-0 left-0
    w-full h-full
    bg-[var(--clr-body-secondary)]
    p-4
`;

export const MobileSidebarCloseButtonContainer = tw.section`
    flex justify-end
    cursor-pointer
`;

export const MobileSidebarContent = tw(motion.section)`
    flex flex-col
    origin-top 
    w-full h-full
    items-center
    translate-y-1/4
    gap-8
    text-3xl
`;
