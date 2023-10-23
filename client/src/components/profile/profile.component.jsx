"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "@/redux/features/user/userSlice";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { firebase } from "@/firebase/firebase.config";

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
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.persistedReducer.user);
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSignout = () => {
    dispatch(signout());
  };

  const handleFileUpload = (file) => {
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

  return (
    <ProfileContainer>
      <ProfileHeader>Profile</ProfileHeader>

      <ProfileForm>
        <input
          type='file'
          ref={fileRef}
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
          hidden
        />
        <ProfileImage
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          onClick={() => fileRef.current.click()}
        />
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
