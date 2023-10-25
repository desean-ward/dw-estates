import tw from "tailwind-styled-components";

export const ProfileContainer = tw.div`
    p-3
    max-w-lg 
    mx-auto

`;

export const ProfileHeader = tw.h1`
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

export const ProfileImage = tw.img`
    object-cover
    
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
bg-slate-700
text-white 
rounded-lg 
p-3
uppercase 
hover:opacity-95
disabled:opacity-80
`;

export const SignOutSection = tw.div`
    flex justify-between
    gap-4
    mt-8
`;

export const SignOutLink = tw.span`
    cursor-pointer
    hover:text-gray-400
`;

export const DeleteAccountLink = tw.span`
    cursor-pointer
    text-red-700
    hover:text-gray-400
`;
