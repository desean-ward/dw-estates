"use client";
import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useSelector } from "react-redux";

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
  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  // Grab the searchTerm from the redux store
  const { search } = useSelector((state) => state.persistedReducer.listing);

  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState("");
  const searchTermFromUrl = urlParams.get("searchTerm");

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log("LISTINGS", listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = searchParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" || false,
        furnished: furnishedFromUrl === "true" || false,
        offer: offerFromUrl === "true" || false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    // TODO ---- Investigate why the search isn't filtering
    const fetchListings = async () => {
      try {
        setLoading(true);

        const searchQuery = urlParams.toString();

        const res = await fetch(`${URL}/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListings(data);
        setLoading(false);

        if (!data) {
          console.log("An error occurred", data);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log("An error occurred", error);
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams.get("searchTerm")]);

  const handleChange = (e) => {
    // If the input id is all, rent or sale
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({
        ...sidebarData,
        type: e.target.id,
      });
    }

    // If the input id is searchTerm
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }

    // If the input id is parking, furnished or offer
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    // If the input id is sort_order
    if (e.target.id === "sort_order") {
      const [sort, order] = e.target.value.split("_");
      setSidebarData({
        ...sidebarData,
        sort,
        order,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the search params
    const urlParams = new URLSearchParams({
      searchTerm: sidebarData.searchTerm,
      type: sidebarData.type,
      parking: sidebarData.parking,
      furnished: sidebarData.furnished,
      offer: sidebarData.offer,
      sort: sidebarData.sort,
      order: sidebarData.order,
    });

    // Convert the search params to a string
    const searchQuery = urlParams.toString();
    console.log("PARAMS", searchQuery);

    router.push(`/search?${searchQuery}`);
  };

  return (
    <SearchContainer>
      <SearchContent>
        <SearchForm onSubmit={handleSubmit}>
          <FormSection id='search-input'>
            <label className='whitespace-nowrap'>Search Term: </label>
            <SearchInput
              type='text'
              id='searchTerm'
              value={sidebarData.searchTerm}
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
                <SearchInput
                  type='checkbox'
                  id='all'
                  onChange={handleChange}
                  checked={sidebarData.type === "all"}
                />
                Rent & Sale
              </span>

              {/* Rent */}
              <span className='flex gap-1'>
                <SearchInput
                  type='checkbox'
                  id='rent'
                  onChange={handleChange}
                  checked={sidebarData.type === "rent"}
                />
                Rent
              </span>

              {/* Sale */}
              <span className='flex gap-1'>
                <SearchInput
                  type='checkbox'
                  id='sale'
                  onChange={handleChange}
                  checked={sidebarData.type === "sale"}
                />
                Sale
              </span>

              {/* Offer */}
              <span className='flex gap-1'>
                <SearchInput
                  type='checkbox'
                  id='offer'
                  onChange={handleChange}
                  checked={sidebarData.offer}
                />
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
                <SearchInput
                  type='checkbox'
                  id='parking'
                  onChange={handleChange}
                  checked={sidebarData.parking}
                />
                Parking
              </span>

              {/* Furnished */}
              <span className='flex gap-1'>
                <SearchInput
                  type='checkbox'
                  id='furnished'
                  onChange={handleChange}
                  checked={sidebarData.furnished}
                />
                Furnished
              </span>
            </div>
          </FormSection>

          {/* Search Order */}
          <FormSection id='search-order' className='gap-8'>
            <label className='font-semibold'>Sort:</label>
            <SearchSelect
              id='sort_order'
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
            >
              <SearchOption value='regularPrice_desc'>
                Price High To Low
              </SearchOption>
              <SearchOption value='regularPrice_asc'>
                Price Low To High
              </SearchOption>
              <SearchOption value='createdAt_desc'>Latest</SearchOption>
              <SearchOption value='createdAt_asc'>Oldest</SearchOption>
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
          <h1 className='p-3 mt-5 text-3xl font-semibold'>Listing Results:</h1>
        </SearchResults>
      </SearchContent>
    </SearchContainer>
  );
};

export default Search;
