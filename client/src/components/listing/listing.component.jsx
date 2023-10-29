"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import "swiper/swiper-bundle.css";

import {
  CopyImageUrl,
  RentOrSale,
  ListingContainer,
  ListingContent,
  ListingTitle,
  ListingAddress,
  ListingOffer,
} from "../listing/listing.styles";
import { Image, ImageContainer, ListingCarousel } from "./listing.styles";

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

const Listing = () => {
  SwiperCore.use([Navigation, Pagination]);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  // Fetch listing
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${URL}/api/listing/get/${listingId}`, {
          method: "GET",
          credentials: "include",
          sameSite: "none",
          secure: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {}
    };
    fetchListings();
  }, [listingId]);
  return (
    <ListingContainer>
      {
        // If loading, show loading message
        loading && <p className='text-2xl text-center my-7'>Loading...</p>
      }

      {
        // If error, show error message
        error && (
          <p className='text-2xl text-center my-7'>Error loading listing</p>
        )
      }

      {listing && !loading && !error && (
        <ListingContent>
          <ListingCarousel>
            <Swiper
              navigation
              pagination={{
                clickable: true,
              }}
              className='mySwiper'
            >
              {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <ImageContainer>
                    <Image src={url} alt='' className='object-fit' />
                  </ImageContainer>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Copy Image URL */}
            <CopyImageUrl>
              <FaShare
                className='text-slate-500'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </CopyImageUrl>

            {/* Show copied message */}
            {copied && (
              <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                Link Copied!
              </p>
            )}
          </ListingCarousel>

          {/* Listing Title  and Address*/}
          <ListingTitle>
            <p className='text-2xl font-semibold'>
              {listing.title} - ${" "}
              {listing.offer
                ? listing.discountedPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && (
                <span className='text-sm'> / month</span>
              )}
            </p>
          </ListingTitle>

          {/* Listing Address */}
          <ListingAddress>
            <FaMapMarkedAlt className='text-green-700' />
            {listing.address}
          </ListingAddress>

          <section className='flex gap-4'>
            {/* Rent or Sale */}
            <RentOrSale>
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </RentOrSale>

            {/* Listing Offer */}
            {listing.offer && (
              <ListingOffer>
                ${listing.regularPrice - +listing.discountedPrice}
              </ListingOffer>
            )}
          </section>

          {/* Listing Description */}
          <section className='my-7 text-slate-800'>
            {" "}
            <span className='font-semibold text-black'>Description: </span>
            {listing.description}
          </section>

          {/* Listing Amenities */}
          <section>
            <ul className='flex flex-wrap items-center gap-8 text-sm font-semibold'>
              <li className='flex items-center gap-2 whitespace-nowrap'>
                <FaBed className='text-lg' />{" "}
                {listing.beds !== 1
                  ? `${listing.beds} Beds`
                  : `${listing.beds} Bed`}
              </li>

              <li className='flex items-center gap-2 whitespace-nowrap'>
                <FaBath className='text-lg' />{" "}
                {listing.baths !== 1
                  ? `${listing.baths} Baths`
                  : `${listing.baths} Bath`}
              </li>

              <li className='flex items-center gap-2 whitespace-nowrap'>
                <FaParking className='text-lg' />{" "}
                {listing.parking ? "Parking" : "No Parking"}
              </li>

              <li className='flex items-center gap-2 whitespace-nowrap'>
                <FaChair className='text-lg' />{" "}
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
          </section>
        </ListingContent>
      )}
    </ListingContainer>
  );
};

export default Listing;
