import React, { useState } from "react";
import { BannerContainer, ContactButton } from "./contact-banner.styles";

import ContactUs from "../contact-us/contact.component";

const ContactBanner = () => {
  const [show, setShow] = useState(false);
  return (
    <BannerContainer>
      <h2 className='mb-4 text-2xl font-bold'>
        Looking To Buy Or Sell With LuxeLiving Estates?
      </h2>
      <p className='text-xl font-semibold'>
        We are dedicated to achieving optimal outcomes for our clients by
        employing a dynamic and inventive professional approach.
      </p>

      <ContactButton onClick={() => setShow(true)}>Contact Us</ContactButton>

      {show && <ContactUs show={setShow} />}
    </BannerContainer>
  );
};

export default ContactBanner;
