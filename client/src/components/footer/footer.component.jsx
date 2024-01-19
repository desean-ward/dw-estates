import React from "react";
import {
  FooterContainer,
  FooterContent,
  FooterCopyright,
  SocialIcon,
  SocialIconsContainer,
} from "./footer.styles";

import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
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

        <FooterCopyright>
          &copy; {new Date().getFullYear()} LuxeLiving Estates
        </FooterCopyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
