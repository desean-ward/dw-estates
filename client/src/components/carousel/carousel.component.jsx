import React, { useState } from "react";
import {
  CarouselContainer,
  CopyImageUrl,
  ImageContainer,
  Image,
} from "./carousel.styles";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import "swiper/swiper-bundle.css";
import { FaShare } from "react-icons/fa";

const Carousel = ({ listings, type = "hero" }) => {
  SwiperCore.use([Navigation]);
  const [copied, setCopied] = useState(false);

  return (
    <CarouselContainer type={type}>
      <Swiper navigation className='mySwiper'>
        {listings &&
          type === "hero" &&
          listings.map((listing, index) => (
            <SwiperSlide key={index}>
              <ImageContainer>
                <Image src={listing.imageUrls} alt='' className='object-fit' />
              </ImageContainer>
            </SwiperSlide>
          ))}

        {listings &&
          type === "listing" &&
          listings.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <ImageContainer>
                <Image src={url} alt='' className='object-fit' />
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
