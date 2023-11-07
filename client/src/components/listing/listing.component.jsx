"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import "swiper/swiper-bundle.css";

import {
  CopyImageUrl,
  RentOrSell,
  ListingContainer,
  ListingContent,
  ListingTitle,
  ListingAddress,
  ListingOffer,
  ListingDetails,
  Detail,
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
import Contact from "../contact/contact.component";
import Carousel from "../carousel/carousel.component";

const Listing = () => {
  SwiperCore.use([Navigation, Pagination]);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const { currentUser } = useSelector((state) => state.persistedReducer.user);

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
        console.log(data);

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
          <Carousel listings={listing} type='listing' />

          <div className='w-[80vw] mx-auto'>
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
              {/* Rent or Sell */}
              <RentOrSell>
                {listing.type === "rent" ? "For Rent" : "For Sell"}
              </RentOrSell>

              {/* Listing Offer */}
              {listing.offer && (
                <ListingOffer>
                  ${listing.regularPrice - +listing.discountedPrice} OFF PROMO
                </ListingOffer>
              )}
            </section>

            {/* Listing Description */}
            <section className='my-7 text-slate-800'>
              {" "}
              <span className='font-semibold text-black'>Description: </span>
              {listing.description}
            </section>

            {/* Listing Details */}
            <section>
              <ListingDetails className=''>
                <Detail>
                  <FaBed className='text-lg' />{" "}
                  {listing.beds !== 1
                    ? `${listing.beds} Beds`
                    : `${listing.beds} Bed`}
                </Detail>

                <Detail>
                  <FaBath className='text-lg' />{" "}
                  {listing.baths !== 1
                    ? `${listing.baths} Baths`
                    : `${listing.baths} Bath`}
                </Detail>

                <Detail>
                  <FaParking className='text-lg' />{" "}
                  {listing.parking ? "Parking" : "No Parking"}
                </Detail>

                <Detail>
                  <FaChair className='text-lg' />{" "}
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </Detail>
              </ListingDetails>
            </section>

            {/* Contact Landlord */}
            <div className='flex py-8'>
              {(!currentUser ||
                (currentUser && listing.userRef !== currentUser._id)) && (
                <button
                  type='button'
                  className='p-3 text-white uppercase border rounded-lg disabled:pointer-events-none bg-slate-700 hover:opacity-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-700'
                  onClick={() => setContact(true)}
                  disabled={currentUser === null}
                >
                  {currentUser ? 'Contact Agent' : 'Login to Contact'}
                </button>
              )}

              {/* Show contact form */}
              {contact && <Contact listing={listing} show={setContact} />}
            </div>
          </div>
        </ListingContent>
      )}
    </ListingContainer>
  );
};

export default Listing;
