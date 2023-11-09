import React from "react";
import { AboutContainer } from "./about.styles";

const About = () => {
  return (
    <AboutContainer>
      <h1 className='mb-4 text-3xl font-bold text-slate-800'>
        About LuxeLiving Estates
      </h1>
      <p className='mb-4 text-slate-600'>
      <span className="font-semibold">LuxeLiving Estates</span> is a real estate company that provides a platform for people to buy and sell properties. We are a team of real estate professionals who are dedicated to providing the best service to our clients.</p>
        
        <p className='mb-4 text-slate-600'>
        We have been in business for over 20 years and have helped thousands of people find their dream home or investment property. Our goal is to make the process as easy as possible for you, so we offer a variety of services including property management, leasing, sales, and more.
        </p>
        
        <p className='mb-4 text-slate-600'>
        If you're looking for a new place to live or want to sell your current one, contact us today!
      </p>
    </AboutContainer>
  );
};

export default About;
