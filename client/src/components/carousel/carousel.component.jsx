import React, { useState } from "react";

import {
  CarouselContainer,
  CopyImageUrl,
  ImageContainer,
  Image,
  PropertyImage,
} from "./carousel.styles";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Loop,
  Autoplay,
} from "swiper/core";
import { register } from "swiper/element/bundle";
import "swiper/swiper-bundle.css";
import "swiper/css/autoplay";

import { FaShare } from "react-icons/fa";

const Carousel = ({ listings, type = "hero" }) => {
  register([Navigation, Pagination, Loop, Autoplay]);
  SwiperCore.use([Navigation, Pagination, Loop, Autoplay]);
  const [copied, setCopied] = useState(false);

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <CarouselContainer
      type={type}
      variants={fadeIn}
      initial='initial'
      animate='animate'
    >
      <Swiper
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={true}
        className='mySwiper'
      >
        {listings &&
          type === "hero" &&
          listings.map((listing, index) => (
            <SwiperSlide key={index}>
              <ImageContainer type={type}>
                <PropertyImage
                  src={listing.imageUrls[0]}
                  alt=''
                  width='1000'
                  height='600'
                />
              </ImageContainer>
            </SwiperSlide>
          ))}

        {listings &&
          type === "listing" &&
          listings.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <ImageContainer>
                <PropertyImage src={url} alt='' width='1000' height='600' />
              </ImageContainer>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Copy Image URL */}
      <CopyImageUrl className={type === "listing" ? "fixed" : "hidden"}>
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
    </CarouselContainer>
  );
};

export default Carousel;
