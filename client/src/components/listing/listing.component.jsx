"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
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
  AddToFavorites,
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

import { IoMdArrowRoundDown } from "react-icons/io";

import Contact from "../contact/contact.component";
import Carousel from "../carousel/carousel.component";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "@/redux/features/user/userSlice";
import { toast } from "react-toastify";

const Listing = () => {
  SwiperCore.use([Navigation, Pagination]);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  // const [favorites, setFavorites] = useState([]);
  let favorites = [];

  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  const dispatch = useDispatch();

  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  const removeFromFavorites = async (id) => {
    // Remove listing from state
    const favorites = currentUser.favorites.filter(
      (listing) => listing._id !== id
    );

    // Map favorites to get ids
    const favoritesIds = favorites.map((favorite) => favorite._id);

    try {
      dispatch(updateUserStart());

      const res = await fetch(`${URL}/api/user/update/${currentUser._id}`, {
        method: "POST",
        credentials: "include",
        sameSite: "none",
        secure: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorites: favoritesIds }),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        setUpdateError(data.message);
        return;
      }

      dispatch(updateUserSuccess(data));

      toast("Favorite removed", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });

      return;
    } catch (error) {
      dispatch(updateUserFailure(error.message));

      toast(error.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const addToFavorites = async () => {
    if (currentUser.favorites.includes(listing._id)) {
      // alert("Already in favorites");
      removeFromFavorites(listing._id);
      return;
    } else favorites.push(...currentUser.favorites, listing._id);

    try {
      dispatch(updateUserStart());

      const res = await fetch(`${URL}/api/user/update/${currentUser._id}`, {
        method: "POST",
        credentials: "include",
        sameSite: "none",
        secure: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorites: favorites }),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        setUpdateError(data.message);
        return;
      }

      dispatch(updateUserSuccess(data));

      toast("Favorite added", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });

      return;
    } catch (error) {
      dispatch(updateUserFailure(error.message));

      toast(error.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

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
          <Carousel listings={listing} type='listing' />

          <div className='w-[80vw] mx-auto'>
            {/* Listing Title  and Address*/}
            <ListingTitle>
              <p className='text-2xl font-semibold'>
                {listing.title} - $
                {listing.offer
                  ? listing.discountedPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && (
                  <span className='text-sm'> / month</span>
                )}
              </p>

              {currentUser && currentUser.role === "customer" && (
                <section>
                  {currentUser.favorites.includes(listing._id) ? (
                    <AddToFavorites>
                      <AiFillHeart
                        className='text-red-700 cursor-pointer'
                        size={28}
                        onClick={addToFavorites}
                      />
                      <span>Favorite</span>
                    </AddToFavorites>
                  ) : (
                    <AddToFavorites>
                      <AiOutlineHeart
                        className='text-red-700 cursor-pointer'
                        size={28}
                        onClick={addToFavorites}
                      />
                      <span>Add to favorites</span>
                    </AddToFavorites>
                  )}
                </section>
              )}
            </ListingTitle>

            {/* Listing Address */}
            <ListingAddress>
              <FaMapMarkedAlt className='text-green-700' />
              {listing.address}
            </ListingAddress>

            <section className='flex flex-wrap gap-4'>
              {/* Rent or Sell */}
              <RentOrSell>
                {listing.type === "rent" ? "For Rent" : "For Sell"}
              </RentOrSell>

              {/* Listing Offer */}
              {listing.offer && (
                <ListingOffer>
                  -$
                  {(
                    listing.regularPrice - +listing.discountedPrice
                  ).toLocaleString("en-US")}{" "}
                  <IoMdArrowRoundDown size={28} />
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
              {!currentUser && (
                <div className='p-3 font-semibold text-red-700 border rounded-lg border-slate-400'>
                  <Link href='/signin'>
                    {" "}
                    Please sign to contact agent or add to favorites
                  </Link>
                </div>
              )}

              {currentUser && listing.userRef !== currentUser._id && (
                <button
                  type='button'
                  className='p-3 text-white uppercase border rounded-lg disabled:pointer-events-none bg-[var(--clr-body-secondary)] hover:opacity-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-700'
                  onClick={() => setContact(true)}
                  disabled={currentUser === null}
                >
                  Contact Agent
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
