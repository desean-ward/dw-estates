"use client";
import React, { useState } from "react";
import {
  FormSection,
  SearchButton,
  SearchContainer,
  SearchContent,
  SearchForm,
  SearchInput,
  SearchOption,
  SearchResults,
  SearchSelect,
} from "./search.styles";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchContent>
        <SearchForm>
          <FormSection id='search-input'>
            <label className='whitespace-nowrap'>Search Term: </label>
            <SearchInput
              type='text'
              id='searchTerm'
              placeholder='Search...'
              onChange={handleChange}
            />
          </FormSection>

          {/* Types */}
          <FormSection id='amenities' className='gap-8'>
            <label className='font-semibold'>Type:</label>
            <div className='flex flex-wrap gap-4 fitems-center'>
              {/* Rent & Sale */}
              <span className='flex gap-1'>
                <SearchInput type='checkbox' id='all' />
                Rent & Sale
              </span>

              {/* Rent */}
              <span className='flex gap-1'>
                <SearchInput type='checkbox' id='rent' />
                Rent
              </span>

              {/* Sale */}
              <span className='flex gap-1'>
                <SearchInput type='checkbox' id='sale' />
                Sale
              </span>

              {/* Offer */}
              <span className='flex gap-1'>
                <SearchInput type='checkbox' id='offer' />
                Offer
              </span>
            </div>
          </FormSection>

          {/* Amenities */}
          <FormSection id='search-input' className='gap-8'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex flex-wrap gap-4 fitems-center'>
              {/* Parking */}
              <span className='flex gap-1'>
                <SearchInput type='checkbox' id='parking' />
                Parking
              </span>

              {/* Furnished */}
              <span className='flex gap-1'>
                <SearchInput type='checkbox' id='furnished' />
                Furnished
              </span>
            </div>
          </FormSection>

          {/* Search Order */}
          <FormSection id='search-order' className='gap-8'>
            <label className='font-semibold'>Sort:</label>
            <SearchSelect id='sort_order'>
              <SearchOption>Price High To Low</SearchOption>
              <SearchOption>Price Low To High</SearchOption>
              <SearchOption>Latest</SearchOption>
              <SearchOption>Oldest</SearchOption>
            </SearchSelect>
          </FormSection>

          {/* Submit */}
          <FormSection id='submit-button'>
            <SearchButton type='submit'>Search</SearchButton>
          </FormSection>
        </SearchForm>
      </SearchContent>

      <SearchContent>
        <SearchResults>
          <h1 className="p-3 mt-5 text-3xl font-semibold">Listing Results:</h1>
        </SearchResults>
      </SearchContent>
    </SearchContainer>
  );
};

export default Search;
