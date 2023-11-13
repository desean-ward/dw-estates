"use client";
import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  FormSection,
  ListingsContainer,
  SearchButton,
  SearchContainer,
  SearchContent,
  SearchForm,
  SearchInput,
  SearchOption,
  SearchResults,
  SearchSelect,
} from "./search.styles";
import ListingItem from "../listing-item/listing-item.component";

const Search = () => {
  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  const router = useRouter();
  const searchParams = useSearchParams();

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
  const [showMore, setShowMore] = useState(false);

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

    const fetchListings = async () => {
      try {
        setLoading(true);
        setShowMore(false);

        const searchQuery = urlParams.toString();

        const res = await fetch(`${URL}/api/listing/get?${searchQuery}`);
        const data = await res.json();

        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }

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
  }, [searchParams]);

  const handleChange = (e) => {
    // If the input id is all, rent or sell
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
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
    router.push(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numOfListings = listings.length;
    const urlParams = new URLSearchParams(location.search);

    // Set the start index to the number of listings
    const startIndex = numOfListings;
    urlParams.set("startIndex", startIndex);

    const searchQuery = urlParams.toString();

    const res = await fetch(`${URL}/api/listing/get?${searchQuery}`);

    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }

    // Add the new listings to the listings state
    setListings([...listings, ...data]);
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
              {/* Rent & Sell */}
              <span className='flex gap-1'>
                <SearchInput
                  type='checkbox'
                  id='all'
                  onChange={handleChange}
                  checked={sidebarData.type === "all"}
                />
                Rent & Sell
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

              {/* sell */}
              <span className='flex gap-1'>
                <SearchInput
                  type='checkbox'
                  id='sell'
                  onChange={handleChange}
                  checked={sidebarData.type === "sell"}
                />
                Sell
              </span>

              {/* Offer */}
              <span className='flex gap-1'>
                <SearchInput
                  type='checkbox'
                  id='offer'
                  onChange={handleChange}
                  checked={sidebarData.offer}
                />
                Promo
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

      <SearchResults>
        <h1 className='p-3 mt-5 text-3xl font-semibold'>Listing Results:</h1>
        <ListingsContainer>
          {!loading && listings.length === 0 && (
            <p className='text-lg text-slate-700'>No listings found</p>
          )}

          {loading && (
            <p className='w-full text-xl text-center text-slate-700'>
              Loading...
            </p>
          )}

          {!loading &&
            listings.length > 0 &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </ListingsContainer>

        {showMore && (
          <div className='w-full text-center'>
            <button
              onClick={() => {
                handleShowMore();
              }}
              className='mx-auto text-[var(--clr-body-secondary)] hover:underline p-7'
            >
              Show More
            </button>
          </div>
        )}
      </SearchResults>
    </SearchContainer>
  );
};

export default Search;
