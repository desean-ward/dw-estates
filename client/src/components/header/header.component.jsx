import React from "react";

import { FaSearch } from "react-icons/fa";

import {
  HeaderContainer,
  Logo,
  LogoContainer,
  LogoImage,
  LogoLink,
  SearchInput,
  SearchContainer,
  NavContainer,
  Nav,
  NavList,
  NavItem,
  NavLink,
} from "./header.styles";

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo>
          <LogoLink href='/'>
            <LogoImage src='/images/logo.png' alt='DW Estates' />
          </LogoLink>
        </Logo>

        <h2 className='flex flex-wrap font-bold tlext-sm fflex-wrap sm:text-xl'>
          <span className='text-slate-500'>DW</span>Estates
        </h2>
      </LogoContainer>

      <SearchContainer>
        <SearchInput type='text' placeholder='Search...' />
        <FaSearch className='cursor-pointer text-slate-600' />
      </SearchContainer>

      <NavContainer>
        <Nav>
          <NavList>
            <NavItem className='hidden sm:inline'>
              <NavLink href='/'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/about'>About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/signin'>Sign In</NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
