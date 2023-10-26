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
  ProfileContainer,
  ProfileForm,
  ProfileHeader,
  ProfileImage,
  ProfileImageContainer,
  SignOutLink,
  SignOutSection,
} from "./profile.styles";

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  const [file, setFile] = useState(null);
  const [avatarUpdated, setAvatarUpdated] = useState(false);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
        return;
      }

      dispatch(deleteUserSuccess(data));
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
        return;
      }

      dispatch(updateUserSuccess(data));
      return;
    } catch (error) {
      dispatch(updateUserFailure(error.message));
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
              onClick={() => fileRef.current.click()}
            />
          ) : (
            <BeatLoader color='#334155' />
          )}
        </ProfileImageContainer>
        <p>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Uploading Image (must be less than 2mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className='text-slate-700'>Uploading {filePercentage}%</span>
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
        />

        <FormButton type='submit'>Update</FormButton>
        <CreateListingsLink href='/create-listing'>
          Create Listing
        </CreateListingsLink>
      </ProfileForm>
      <SignOutSection>
        <DeleteAccountLink onClick={handleDeleteUser}>
          Delete Account
        </DeleteAccountLink>

        <SignOutLink onClick={handleSignout}>Sign Out</SignOutLink>
      </SignOutSection>
    </ProfileContainer>
  );
};

export default Profile;
