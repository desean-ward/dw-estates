"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutStart,
  signoutFailure,
  signoutSuccess,
} from "@/redux/features/user/userSlice";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { firebase } from "@/firebase/firebase.config";

import { BeatLoader } from "react-spinners";

import {
  CreateListingsLink,
  DeleteAccountLink,
  FormButton,
  FormInput,
  ListingContainer,
  ListingImage,
  ListingImageContainer,
  ListingItem,
  Listings,
  ProfileContainer,
  ProfileForm,
  ProfileHeader,
  ProfileImage,
  ProfileImageContainer,
  ShowListingsLink,
  SignOutLink,
  SignOutSection,
} from "./profile.styles";

import Link from "next/link";

import { toast } from "react-toastify";
import { current } from "@reduxjs/toolkit";

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.persistedReducer.user);

  const [file, setFile] = useState(null);
  const [avatarUpdated, setAvatarUpdated] = useState(false);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  // Handle delete account
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`${URL}/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
        sameSite: "none",
        secure: true,
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        setUpdateError(data.message);
        return;
      }

      dispatch(deleteUserSuccess(data));
      toast("Account successfully deleted", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`${URL}/api/user/update/${currentUser._id}`, {
        method: "POST",
        credentials: "include",
        sameSite: "none",
        secure: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        setUpdateError(data.message);
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

      toast("Profile updated successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
      return;
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setUpdateSuccess(error.message);
    }
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

      if (data.success === false) {
        dispatch(signoutFailure(data.message));
        return;
      }

      dispatch(signoutSuccess(data));
    } catch (error) {
      dispatch(signoutFailure(error.message));
    }
  };

  const handleFileUpload = (file) => {
    setAvatarUpdated(true);

    fileUploadError && setFileUploadError(false);

    // Create a storage reference from our storage service
    const storage = getStorage(firebase);

    // Create a unique name for the file
    const fileName = new Date().getTime() + "-" + file.name;

    // Create a reference to the file we want to upload
    const storageRef = ref(storage, fileName);

    // Create a task to upload the file, and get the upload task state
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        // Update the file percentage state
        setFilePercentage(Math.round(progress));
      },

      // Handle unsuccessful uploads
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },

      // Handle successful uploads on complete
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);

      const res = await fetch(`${URL}/api/user/listings/${currentUser._id}`, {
        method: "GET",
        credentials: "include",
        sameSite: "none",
        secure: true,
      });

      const data = await res.json();
      setUserListings(data);

      if (data.success === false) {
        setShowListingsError(data.message);
        return;
      }
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (id) => {
    try {
      const res = await fetch(`${URL}/api/listing/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
        sameSite: "none",
        secure: true,
      });

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      // Remove listing from state
      setUserListings(userListings.filter((listing) => listing._id !== id));

      toast("Listing deleted successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemoveFavorite = async (id) => {
    // Remove listing from state
    const favorites = userFavorites.filter((listing) => listing._id !== id);

    // Map favorites to get ids
    const favoritesIds = favorites.map((favorite) => favorite._id);

    try {
      const res = await fetch(`${URL}/api/user/update/${currentUser._id}`, {
        method: "POST",
        credentials: "include",
        sameSite: "none",
        secure: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorites: favoritesIds }),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        console.log(data);
        dispatch(updateUserFailure(data.message));
        setUpdateError(data.message);
        return;
      }

      dispatch(updateUserSuccess(data));
      setUserFavorites(favorites);

      toast("Favorite removed", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });

      return;
    } catch (error) {
      dispatch(updateUserFailure(error.message));

      toast(error.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  // Fetch User Favorites
  const handleGetFavorites = async () => {
    setLoading(false);
    setError(false);

    if (!currentUser.favorites) return;

    try {
      setLoading(true);

      const promises = currentUser.favorites.map(async (favorite) => {
        console.log(favorite);
        const res = await fetch(`${URL}/api/listing/get/${favorite}`, {
          method: "GET",
          credentials: "include",
          sameSite: "none",
          secure: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (data.success === false) {
          console.log(data);
          dispatch(updateUserFailure(data.message));
          setUpdateError(data.message);
          return;
        }

        return data;
      });

      const favorites = await Promise.all(promises);

      setUserFavorites(favorites);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error.message);
      setError(true);
      setLoading(false);
    }
  };

  // Get Favorites and Property Listings
  useEffect(() => {
    if (currentUser.role === "agent") {
      handleShowListings();
    } else {
      handleGetFavorites();
    }
  }, []);

  // Handle file upload
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  // Monitor avatar change
  useEffect(() => {
    setAvatarUpdated(false);
  }, [formData.avatar]);

  return (
    <ProfileContainer>
      <div>
        <ProfileHeader>Profile</ProfileHeader>

        <ProfileForm onSubmit={handleSubmit}>
          <input
            type='file'
            ref={fileRef}
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
            hidden
          />
          <ProfileImageContainer>
            {!avatarUpdated ? (
              <ProfileImage
                src={formData.avatar || currentUser.avatar}
                alt='profile'
                width='100'
                height='100'
                onClick={() => fileRef.current.click()}
              />
            ) : (
              <BeatLoader color='#334155' />
            )}
          </ProfileImageContainer>
          <p>Update Photo</p>
          <p>
            {fileUploadError ? (
              <span className='text-red-700'>
                Error Uploading Image (must be less than 2mb)
              </span>
            ) : filePercentage > 0 && filePercentage < 100 ? (
              <span className='text-slate-700'>
                Uploading {filePercentage}%
              </span>
            ) : filePercentage === 100 ? (
              <span className='text-green-700'>Upload Complete</span>
            ) : (
              ""
            )}
          </p>

          <FormInput
            type='text'
            id='username'
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <FormInput
            type='email'
            id='email'
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <FormInput
            type='password'
            id='password'
            defaultValue={currentUser.password}
            onChange={handleChange}
            placeholder='Update Password...'
          />

          <FormButton type='submit'>Update</FormButton>
        </ProfileForm>
        <SignOutSection>
          <DeleteAccountLink onClick={handleDeleteUser}>
            Delete Account
          </DeleteAccountLink>

          <SignOutLink onClick={handleSignout}>Sign Out</SignOutLink>
        </SignOutSection>

        <p className='mt-5 text-sm text-red-700'>
          {updateError && updateError}
        </p>
        <p className='mt-5 text-sm text-green-700'>
          {updateSuccess && "User updated successfully!"}
        </p>
      </div>

      <div>
        <p className='mt-5 text-red-700'>
          {showListingsError && showListingsError}
        </p>

        <ListingContainer>
          <h2 className='text-2xl font-semibold text-center my-7'>
            {currentUser.role === "agent" ? "Your Listings" : "Saved Favorites"}
          </h2>

          {/*If user is an agent, show user listings */}
          {userListings && userListings.length > 0 ? (
            <Listings>
              {userListings.map((listing, index) => (
                <ListingItem key={index}>
                  <Link href={`/listing/${listing._id}`}>
                    <ListingImageContainer>
                      <ListingImage
                        src={listing.imageUrls[0]}
                        width='100'
                        height='100'
                        alt='Listing'
                      />
                    </ListingImageContainer>
                  </Link>

                  <Link href={`/listing/${listing._id}`} className='flex-1'>
                    <p className='hover:text-[var(--clr-text-accent)]'>
                      <span>{listing.title}</span>
                    </p>
                  </Link>

                  <div className='relative z-50 flex flex-col'>
                    <Link
                      href={`/update-listing/${listing._id}`}
                      className='hover:text-[var(--clr-text-accent)]'
                    >
                      Edit
                    </Link>
                    <button
                      type='button'
                      className='text-red-700 hover:text-[var(--clr-text-accent)]'
                      onClick={() => handleListingDelete(listing._id)}
                    >
                      Delete
                    </button>
                  </div>
                </ListingItem>
              ))}
            </Listings>
          ) : (
            currentUser.role === "agent" && (
              <span className='flex justify-center'>No Listings Found</span>
            )
          )}
          {currentUser.role === "agent" && (
            <div className='flex justify-center mb-16'>
              <CreateListingsLink href='/create-listing'>
                Create Listing
              </CreateListingsLink>
            </div>
          )}

          {/*If user is an customer, show user favorites */}
          {userFavorites && userFavorites.length > 0 ? (
            <Listings>
              {userFavorites.map((listing, index) => (
                <ListingItem key={index}>
                  <Link href={`/listing/${listing._id}`}>
                    <ListingImageContainer>
                      <ListingImage
                        src={listing.imageUrls[0]}
                        width='100'
                        height='100'
                        alt=''
                      />
                    </ListingImageContainer>
                  </Link>

                  <Link href={`/listing/${listing._id}`} className='flex-1'>
                    <p className='truncate hover:text-[var(--clr-text-accent)]'>
                      <span>{listing.title}</span>
                    </p>
                  </Link>

                  <div className='relative z-50 flex flex-col'>
                    <button
                      type='button'
                      className='text-red-700 hover:text-[var(--clr-text-accent)]'
                      onClick={() => handleRemoveFavorite(listing._id)}
                    >
                      Remove
                    </button>
                  </div>
                </ListingItem>
              ))}
            </Listings>
          ) : (
            currentUser.role === "customer" && (
              <span className='flex justify-center'>No Favorites Found</span>
            )
          )}
        </ListingContainer>
      </div>
    </ProfileContainer>
  );
};

export default Profile;
