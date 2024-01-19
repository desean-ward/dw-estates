import React, { useEffect, useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import { HeroContainer, HeroContent } from "./hero.styles";
import Link from "next/link";
import Loading from "../loading/loading.component";

const Carousel = lazy(() => import("../carousel/carousel.component"));
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
            <span className='font-semibold'>LuxeLiving Estates</span> is the go
            to source to find your next{" "}
            <span className='font-semibold'>perfect</span> place to live. We
            have a wide selection of{" "}
            <span className='font-semibold'>luxury properties</span>,{" "}
            <span className='font-semibold'>amenities</span> and{" "}
            <span className='font-semibold'>award-winning</span> agents to help
            satisfy your heart's desire. Let's find{" "}
            <span className='text-[var(--clr-text-accent)] font-bold'>
              YOUR
            </span>{" "}
            dream home today!
          </p>
        </div>

        <Link
          href='/search'
          className='relative font-semibold top-8 hover:text-[var(--clr-text-accent)] '
        >
          Browse Listings...
        </Link>
      </HeroContent>

      <Suspense fallback={<Loading />}>
        {promoListings.length && (
          <Carousel listings={promoListings} type='hero' />
        )}
      </Suspense>
    </HeroContainer>
  );
};

export default Hero;
