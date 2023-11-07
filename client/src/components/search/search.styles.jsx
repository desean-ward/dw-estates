import tw from "tailwind-styled-components";

export const SearchContainer = tw.div`
    flex flex-col md:flex-row
    
   
    
`;

export const SearchContent = tw.div`
    p-3
`;

export const SearchForm = tw.form`
    flex flex-col
    border-b-2 md:border-r-2
    md:h-screen
    p-8
   

`;

export const FormSection = tw.section`
    flex items-center gap-2 
    p-3
 `;

export const SearchInput = tw.input`
    w-full
    border border-slate-400
    p-3
    rounded-md

    ${({ type }) => type === "checkbox" && "w-5 cursor-pointer"}
`;

export const SearchSelect = tw.select`
    p-3
    bg-[--clr-body-secondary]
    text-white
    rounded-lg
    cursor-pointer

`;

export const SearchOption = tw.option`
    bg-white 
    text-[--clr-body-secondary]
    cursor-pointer
    p-3
`;

export const SearchButton = tw.button`
    w-full
    bg-[--clr-body-secondary]
    text-white 
    uppercase 
    p-3
    rounded-lg 
    hover:opacity-95
`;

export const SearchResults = tw.div`
    flex-1
`;

export const ListingsContainer = tw.div`
    p-7
    flex flex-wrap
    justify-center sm:justify-start
    gap-4

    
`;
