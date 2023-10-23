"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { signout } from "@/redux/features/user/userSlice";
import ProtectedRoute from "../protected/protected.component";
import { SignOutLink } from "./profile.styles";

const Profile = () => {
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signout());
  };

  return (
    <ProtectedRoute>
      <h1>Profile</h1>
      <SignOutLink onClick={handleSignout}>Sign Out</SignOutLink>
    </ProtectedRoute>
  );
};

export default Profile;
