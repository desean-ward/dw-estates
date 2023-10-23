"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { signout } from "@/redux/features/user/userSlice";
import { SignOutLink } from "./profile.styles";

const Profile = () => {
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signout());
  };

  return (
    <div>
      <h1>Profile</h1>
      <SignOutLink onClick={handleSignout}>Sign Out</SignOutLink>
    </div>
  );
};

export default Profile;
