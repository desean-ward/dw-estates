import Image from "next/image";
import Link from "next/link";
import tw from "tailwind-styled-components";

export const ProfileContainer = tw.div`
    p-4 md:px-8
    flex flex-col
    justify-center
    lg:grid grid-cols-2
    gap-16
    
    w-lg md:max-w-7xl
    mx-auto
`;

export const ProfileHeader = tw.h1`
    w-screen
    max-w-7xl
    text-3xl text-center
    font-semibold
    my-8
`;

export const ProfileForm = tw.form`
    flex flex-col
    items-center
    gap-4
`;

export const ProfileImageContainer = tw.div`
    w-24 h-24
    flex items-center justify-center
    rounded-full
    overflow-hidden
`;

export const ProfileImage = tw(Image)`
    object-cover
    w-full 
    h-full 
    cursor-pointer 
`;

export const FormInput = tw.input`
    border-2 border-gray-300
    rounded-lg
    px-4 py-2
    my-2
    w-full
`;

export const FormButton = tw.button`
    w-full
    bg-[var(--clr-body-secondary)]
    text-white 
    rounded-lg 
    p-3
    uppercase 
    hover:opacity-95
    disabled:opacity-80
`;

export const CreateListingsLink = tw(Link)`
    relative
    top-16
    w-full 
    flex justify-center
    p-3 
    my-4
    text-white 
    text-center
    uppercase 
    rounded-lg  
    bg-slate-700 
    hover:opacity-95 
`;

export const SignOutSection = tw.div`
    flex justify-between
    gap-4
    mt-8
`;

export const SignOutLink = tw.span`
    cursor-pointer
    hover:text-[var(--clr-text-accent)]
`;

export const DeleteAccountLink = tw.span`
    cursor-pointer
    text-red-700
    hover:text-[var(--clr-text-accent)]
`;

export const ShowListingsLink = tw.span`
    block
    cursor-pointer
    hover:text-[var(--clr-text-accent)]
    text-center
    my-8
`;

export const ListingContainer = tw.div`
    relative 
    lg:top-[6em]
    
`;
export const Listings = tw.section`
    relative 
    top-12
    max-h-[400px]
    overflow-scroll
    border-2 border-slate-700/20
    p-4
    rounded-lg
    
`;
export const ListingItem = tw.section`
    font-semibold
    flex justify-between items-center
    gap-2
    p-4
    border-b-2 border-slate-700/20
    mb-4
`;

export const ListingImageContainer = tw.section`
    w-16
    h-12
    flex items-center justify-center
    
`;

export const ListingImage = tw(Image)`
    w-full
    h-full
    object-contain 
     
`;
