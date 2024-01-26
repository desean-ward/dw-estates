import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

import {
  BannerContainer,
  BannerContent,
  ContactButton,
} from "./contact-banner.styles";

import ContactUs from "../contact-us/contact.component";

const ContactBanner = () => {
  const [show, setShow] = useState(false);
  const [boxRef, inView] = useInView();
  const [contentRef, contentInView] = useInView();

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.75, delay: 0.3 } },
  };

  const slideIn = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
  };

  return (
    <BannerContainer
      ref={boxRef}
      variants={fadeIn}
      initial='hidden'
      animate={inView ? "visible" : "hidden"}
    >
      <BannerContent
        ref={contentRef}
        variants={slideIn}
        initial='hidden'
        animate={contentInView ? "visible" : "hidden"}
      >
        <h2 className='mb-4 text-2xl font-bold'>
          Looking To Buy Or Sell With LuxeLiving Estates?
        </h2>

        <p className='text-xl font-semibold'>
          We are dedicated to achieving optimal outcomes for our clients by
          employing a dynamic and inventive professional approach.
        </p>

        <ContactButton onClick={() => setShow(true)}>Contact Us</ContactButton>

        {show && <ContactUs show={setShow} />}
      </BannerContent>
    </BannerContainer>
  );
};

export default ContactBanner;
