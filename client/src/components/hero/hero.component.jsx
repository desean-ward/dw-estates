import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { HeroContainer, HeroContent } from "./hero.styles";
import Link from "next/link";
import Carousel from "../carousel/carousel.component";

const Hero = ({ promoListings }) => {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);

  return (
    <HeroContainer>
      <HeroContent>
        <h3 className='text-lg font-semibold '>
          {currentUser ? `Welcome, ${currentUser.username}!` : "Welcome!"}
        </h3>

        <h1 className='py-4 text-3xl font-bold md:text-6xl'>
          Find Your{" "}
          <span className='text-[var(--clr-text-accent)]'>Perfect</span> Dream
          Home
        </h1>

        <div className='text-sm sm:text-base'>
          <p>
            DW Estates is the go to source to find your next{" "}
            <span className='font-semibold'>perfect</span> place to live
          </p>

          <p>
            We have a wide selection of{" "}
            <span className='font-semibold'>luxury properties</span>,{" "}
            <span className='font-semibold'>amenities</span> and{" "}
            <span className='font-semibold'>award-winning</span> agents to
            satisfy your heart's desire!
          </p>
        </div>

        <Link
          href='/search'
          className='relative font-semibold top-8 hover:underline'
        >
          Browse Listings...
        </Link>
      </HeroContent>

      <div>{promoListings.length && <Carousel listings={promoListings} />}</div>
    </HeroContainer>
  );
};

export default Hero;
