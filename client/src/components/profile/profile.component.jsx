"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "@/redux/features/user/userSlice";
import {
  DeleteAccountLink,
  FormButton,
  FormInput,
  ProfileContainer,
  ProfileForm,
  ProfileHeader,
  ProfileImage,
  SignOutLink,
  SignOutSection,
} from "./profile.styles";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.persistedReducer.user);

  const handleSignout = () => {
    dispatch(signout());
  };

  return (
    <ProfileContainer>
      <ProfileHeader>Profile</ProfileHeader>

      <ProfileForm>
        <ProfileImage src={currentUser.avatar} alt='profile' />

        <FormInput
          type='text'
          id='username'
          placeholder={currentUser.username}
        />
        <FormInput type='email' id='email' placeholder={currentUser.email} />
        <FormInput
          type='password'
          id='password'
          placeholder={currentUser.password}
        />

        <FormButton type='submit'>Update</FormButton>
      </ProfileForm>
      <SignOutSection>
        <DeleteAccountLink to='/delete-account'>
          Delete Account
        </DeleteAccountLink>
        <SignOutLink onClick={handleSignout}>Sign Out</SignOutLink>
      </SignOutSection>
    </ProfileContainer>
  );
};

export default Profile;
