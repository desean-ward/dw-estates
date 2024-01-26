"use client";
import React from "react";
import {
  FooterContainer,
  FooterContent,
  FooterCopyright,
  FooterTopSection,
  InfoField,
  InfoIcon,
  InfoText,
  Left,
  Middle,
  Right,
  SocialIcon,
  SocialIconsContainer,
} from "./footer.styles";

import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaPinterestP,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";

import { MdEmail } from "react-icons/md";
import {
  SlideInLeft,
  SlideInRight,
  SlideUp,
} from "../animations/animations.component";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SlideUp>
          <FooterTopSection>
            <Left>
              <h2 className='flex flex-wrap text-2xl font-bold md:gap-2'>
                <span>
                  <span className='text-[var(--clr-text-accent)]'>Luxe</span>
                  Living
                </span>
                Estates
              </h2>
              <p className='py-4 text-left'>
                Your dependable real estate companion in enchanting Rarotonga,
                presenting a collection of dream properties and promising
                investment opportunities.
              </p>
            </Left>

            <Middle>
              <span className='font-bold'>USA</span>
              <InfoField>
                <InfoIcon>
                  <FaLocationDot />
                </InfoIcon>
                <InfoText>
                  123 Madison Street, Suite 123 <br />
                  Chicago, Illinois 60601
                </InfoText>
              </InfoField>

              <InfoField>
                <InfoIcon>
                  <MdEmail />
                </InfoIcon>
                <InfoText>dward@desean-ward.me</InfoText>
              </InfoField>

              <InfoField>
                <InfoIcon>
                  <FaPhoneAlt />
                </InfoIcon>
                <InfoText>+1 773-209-1814</InfoText>
              </InfoField>
            </Middle>

            <Right>
              <p className='px-2 font-bold'>Follow Us</p>
              <SocialIconsContainer>
                <SocialIcon>
                  <FaFacebookF color='#000' />
                </SocialIcon>
                <SocialIcon>
                  <FaTwitter color='#000' />
                </SocialIcon>
                <SocialIcon>
                  <FaTiktok color='#000' />
                </SocialIcon>
                <SocialIcon>
                  <FaPinterestP color='#000' />
                </SocialIcon>
                <SocialIcon>
                  <FaInstagram color='#000' />
                </SocialIcon>
              </SocialIconsContainer>
            </Right>
          </FooterTopSection>
        </SlideUp>

        <section className='w-full'>
          <hr />
        </section>
        <FooterCopyright>
          <SlideInLeft>
            <span>&copy; {new Date().getFullYear()} LuxeLiving Estates</span>
          </SlideInLeft>
          
          <SlideInRight>De Sean Ward Dezignz</SlideInRight>
        </FooterCopyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
