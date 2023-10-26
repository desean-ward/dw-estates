import Link from "next/link";
import tw from "tailwind-styled-components";

export const CreateListingContainer = tw.main`
    p-3
    max-w-4xl
    mx-auto
`;

export const CreateListingHeader = tw.h1`
    text-3xl
    font-smibold 
    text-center 
    my-7
`;

export const CreateListingForm = tw.form`
    flex flex-col md:flex-row
    gap-4
`;

export const FormInputSection = tw.section`
    flex flex-col 
    gap-4
    flex-1
    mb-8
`;

export const FormInput = tw.input`
    border border-gray-300
    p-3
    rounded-lg 

    ${({ type }) =>
      type === "checkbox" &&
      `
        cursor-pointer
        w-5 h-5
    `}

    ${({ type }) =>
      type === "number" &&
      `
        cursor-pointer
        w-24 h-16
    `}

    ${({ type }) =>
      type === "file" &&
      `
        w-full
    `}


    ${({ name }) => name === "price" && `w-fit`}
`;

export const FormTextArea = tw.textarea`
    w-full
    border 
    p-3
    rounded-lg 
    resize-none
`;

export const FormOptionsSection = tw.section`
    flex flex-col gap-4
`;

export const FormAmenities = tw.section`
    flex gap-6
    flex-wrap
`;

export const Option = tw.section`
    flex items-center gap-2 
    max-w-max
`;

export const BedBathSection = tw.section`
    flex gap-6
`;

export const PricesSection = tw.section`
    flex flex-col flex-1 gap-6 flex-wrap
`;

export const ImagesSection = tw.section`
    flex flex-col flex-1 gap-6 
`;

export const FormButton = tw.button`
    bg-slate-700
    text-white 
    rounded-lg 
    py-3 px-6
    uppercase 
    hover:opacity-95
    disabled:opacity-80
`;

export const UploadLink = tw(Link)`
    p-3 
    text-green-700
    border border-green-700
    text-center
    uppercase 
    rounded-lg  
    hover:bg-green-700
    hover:text-white
    hover:border-white
`;
