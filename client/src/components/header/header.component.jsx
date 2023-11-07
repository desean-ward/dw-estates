"use client";
import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useSelector, useDispatch } from "react-redux";

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

  // Grab the searchTerm from the redux store

  const router = useRouter();

  // Get the searchTerm from the url
  const searchParams = useSearchParams();

  // Get the searchTerm from the url for setting/updating the searchTerm state
  const urlParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);

    // Set the searchTerm query param to the value of the input
    urlParams.set("searchTerm", searchTerm);

    // Create a query string from the urlParams
    const searchQuery = urlParams.toString();

    // Push the query string to the url
    router.push(`/search?${searchQuery}`);
  };

  const handleChange = (e) => {
    // Set the searchTerm state to the value of the input
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setSearchTerm(searchParams.get("searchTerm") || "");
  }, [searchParams.get("searchTerm")]);

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <LogoLink href='/'>
            <Logo>
              <LogoImage src='/images/logo.png' alt='' />
            </Logo>

            <h2 className='flex flex-wrap text-sm font-bold sm:text-xl'>
              <span className='text-[var(--clr-text-accent)]'>DW</span>Estates
            </h2>
          </LogoLink>
        </LogoContainer>

        <SearchContainer onSubmit={handleSubmit}>
          <SearchInput
            type='text'
            onChange={handleChange}
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
                      <img src={currentUser.avatar} alt='profile' className="w-full h-full"/>
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
