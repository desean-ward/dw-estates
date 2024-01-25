import React, { useEffect, useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import {
  HeroContainer,
  HeroContent,
  LeftSection,
  RightSection,
} from "./hero.styles";
import Link from "next/link";
import Loading from "../loading/loading.component";

const Carousel = lazy(() => import("../carousel/carousel.component"));

const Hero = ({ promoListings }) => {
  const { currentUser } = useSelector((state) => state.persistedReducer.user);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 }, delay: 1 },
  };

  const slideIn = {
    hidden: { x: 100, opacity: 0, blur: 50 },
    visible: {
      x: 0,
      opacity: 1,
      blur: 0,
      transition: { duration: 1 },
      delay: 1,
    },
  };

  return (
    <HeroContainer>
      <HeroContent>
        <LeftSection variants={fadeIn} initial='hidden' animate='visible'>
          <h3 className='text-lg font-semibold '>
            {currentUser ? `Welcome, ${currentUser.username}!` : "Welcome!"}
          </h3>

          <h1 className='py-4 text-3xl font-bold md:text-6xl'>
            Find Your{" "}
            <span className='text-[var(--clr-text-accent)]'>Perfect</span> Dream
            Home
          </h1>
        </LeftSection>

        <RightSection variants={slideIn} initial='hidden' animate='visible'>
          <div className='text-sm sm:text-base'>
            <p>
              <span className='font-semibold'>LuxeLiving Estates</span> is the
              go to source to find your next{" "}
              <span className='font-semibold'>perfect</span> place to live. We
              have a wide selection of{" "}
              <span className='font-semibold'>luxury properties</span>,{" "}
              <span className='font-semibold'>amenities</span> and{" "}
              <span className='font-semibold'>award-winning</span> agents to
              help satisfy your heart's desire. Let's find{" "}
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
        </RightSection>
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
