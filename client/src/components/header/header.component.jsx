"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

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
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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

        <SearchContainer onSubmit={handleSubmit}>
          <SearchInput
            type='text'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder='Search...'
          />
          <button>
            <FaSearch className='cursor-pointer text-slate-600' />
          </button>
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
