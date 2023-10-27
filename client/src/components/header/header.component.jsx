"use client";
import React from "react";

import { useSelector } from "react-redux";

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
  AvatarContainer,
  HeaderContent,
} from "./header.styles";

const Header = () => {
  // Grab the current user from the redux store
  const { currentUser } = useSelector((state) => state.persistedReducer.user);

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <Logo>
            <LogoLink href='/'>
              <LogoImage src='/images/logo.png' alt='DW Estates' />
            </LogoLink>
          </Logo>

          <h2 className='flex flex-wrap text-sm font-bold sm:text-xl'>
            <span className='text-[var(--clr-text-accent)]'>DW</span>Estates
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
                {currentUser ? (
                  <NavLink href='/profile'>
                    <AvatarContainer>
                      <img src={currentUser.avatar} alt='profile' />
                    </AvatarContainer>
                  </NavLink>
                ) : (
                  <NavLink href='/signin'>Sign In</NavLink>
                )}
              </NavItem>
            </NavList>
          </Nav>
        </NavContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
