"use client";
import React, { use, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useSelector, useDispatch } from "react-redux";

import { FaRegWindowClose, FaSearch } from "react-icons/fa";

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
  MobileSidebarContainer,
  MobileSidebarCloseButtonContainer,
  MobileSidebarContent,
  MenuContainer,
  MenuContent,
} from "./header.styles";

import { AnimatePresence } from "framer-motion";
import {
  signoutFailure,
  signoutStart,
  signoutSuccess,
} from "@/redux/features/user/userSlice";

const Header = () => {
  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  // Animate the desktop menu
  const slideIn = {
    hidden: { y: "-200%", transition: { duration: 0.5, ease: "easeInOut" } },
    visible: { y: "0", transition: { duration: 0.5, ease: "easeInOut" } },
    exit: {
      y: "-200%",
      transition: { duration: 0.5, delay: 0.5, ease: "easeInOut" },
    },
  };

  // Animate the mobile sidebar
  const mobileSlideIn = {
    hidden: { x: "100%", transition: { duration: 0.5, ease: "easeInOut" } },
    visible: { x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: {
      x: "100%",
      transition: { duration: 0.5, delay: 0.5, ease: "easeInOut" },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
    },
  };

  // Open and close the mobile sidebar state
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  // Grab the current user from the redux store
  const { currentUser } = useSelector((state) => state.persistedReducer.user);

  const dispatch = useDispatch();

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

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());

      const res = await fetch(`${URL}/api/auth/signout`, {
        method: "GET",
        credentials: "include",
        sameSite: "none",
        secure: true,
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signoutFailure(data.message));
        return;
      }
      toggleSidebar();
      dispatch(signoutSuccess(data));
    } catch (error) {
      dispatch(signoutFailure(error.message));
    }
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
                <NavLink className='hidden md:block' href='/about'>
                  About
                </NavLink>
              </NavItem>
              <span>
                {currentUser ? (
                  <span className='flex flex-col items-center space-y-6'>
                    <AvatarContainer onClick={toggleSidebar}>
                      <img
                        src={currentUser.avatar}
                        alt='profile'
                        className='w-full h-full'
                      />
                    </AvatarContainer>

                    {/* Desktop Mini-menu */}
                    <AnimatePresence mode='wait'>
                      <MenuContainer
                        variants={slideIn}
                        initial='hidden'
                        animate={open ? "visible" : "exit"}
                        exit='exit'
                      >
                        <MenuContent
                          variants={fadeIn}
                          initial='hidden'
                          animate={open ? "visible" : "exit"}
                          exit='exit'
                        >
                          <NavItem onClick={toggleSidebar}>
                            <NavLink href='/profile'>Profile</NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href='/' onClick={handleSignout}>
                              Sign Out
                            </NavLink>
                          </NavItem>
                        </MenuContent>
                      </MenuContainer>
                    </AnimatePresence>
                  </span>
                ) : (
                  <NavItem>
                    <NavLink href='/signin'>Sign In</NavLink>
                  </NavItem>
                )}
              </span>
            </NavList>
          </Nav>
        </NavContainer>
      </HeaderContent>

      {/* Mobile Sidebar */}
      <AnimatePresence mode='wait'>
        <MobileSidebarContainer
          className='md:hidden'
          variants={mobileSlideIn}
          initial='hidden'
          animate={open ? "visible" : "exit"}
          exit='exit'
        >
          <MobileSidebarCloseButtonContainer onClick={toggleSidebar}>
            <FaRegWindowClose size={42} />
          </MobileSidebarCloseButtonContainer>

          <MobileSidebarContent
            variants={fadeIn}
            initial='hidden'
            animate={open ? "visible" : "exit"}
            exit='exit'
          >
            <NavLink href='/' onClick={toggleSidebar}>
              Home
            </NavLink>
            <NavLink href='/about' onClick={toggleSidebar}>
              About
            </NavLink>
            <NavLink href='/profile' onClick={toggleSidebar}>
              Profile
            </NavLink>
            <NavLink href='/' onClick={handleSignout}>
              Sign Out
            </NavLink>
          </MobileSidebarContent>
        </MobileSidebarContainer>
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
