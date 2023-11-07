"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";

import {
  CreateListingContainer,
  CreateListingForm,
  CreateListingHeader,
  FormTextArea,
  FormInput,
  FormInputSection,
  FormOptionsSection,
  FormAmenities,
  Option,
  BedBathSection,
  PricesSection,
  ImagesSection,
  FormButton,
} from "./create-listing.styles";

import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { firebase } from "@/firebase/firebase.config";

const CreateListing = () => {
  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  const router = useRouter();

  const { currentUser } = useSelector((state) => state.persistedReducer.user);

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    description: "",
    address: "",
    type: "rent",
    beds: 1,
    baths: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const handleImageUpload = (e) => {
    if (images.length > 0 && images.length && formData.imageUrls.length <= 6) {
      setUploading(true);
      setImageUploadError(null);
      const promises = [];

      // Upload each image to Firebase Cloud Storage
      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }

      // Once all images have been uploaded, concatonate the imageUrls in the formData
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Error uploading images");
          setUploading(false);
        });
    } else {
      images.length === 0 && setImageUploadError("No images selected");

      images.length > 6 && setImageUploadError("Max 6 images allowed");

      setUploading(false);
    }
  };

  const handleImageUrlUpload = (e) => {
    const url = document.getElementById("url").value;
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.concat(url),
    });
  };


  // Uploads a file to Firebase Cloud Storage.
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(firebase);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Upload is ${progress}% done`);
        },

        // If an error occurs, reject it
        (error) => {
          reject(error);
        },

        // Upload completed successfully, and get the download URL
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: !formData[e.target.id],
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the user has uploaded at least one image
      if (formData.imageUrls.length === 0) {
        setImageUploadError("Please upload at least one image");
        return;
      }

      // Check if the discounted price is greater than the regular price
      if (formData.regularPrice < formData.discountedPrice)
        return setSubmitError(
          "Discounted price cannot be greater than regular price"
        );

      setLoading(true);
      setSubmitError(false);

      const res = await fetch(`${URL}/api/listing/create`, {
        method: "POST",
        credentials: "include",
        sameSite: "none",
        secure: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setSubmitError(data.message);
      }

      router.push(`/listing/${data._id}`);
    } catch (error) {
      setSubmitError(error.message);
      setLoading(false);
    }
  };

  return (
    <CreateListingContainer>
      <CreateListingHeader>Create a Listing</CreateListingHeader>

      <CreateListingForm onSubmit={handleSubmit}>
        <FormInputSection>
          <FormInput
            type='text'
            placeholder='Title'
            id='title'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.title}
          ></FormInput>

          <FormTextArea
            type='text'
            placeholder='Desecription'
            id='description'
            rows='5'
            required
            onChange={handleChange}
            value={formData.description}
          ></FormTextArea>

          <FormInput
            type='text'
            placeholder='Address'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          ></FormInput>

          <FormOptionsSection>
            {/* Amenities Options */}
            <FormAmenities>
              <Option>
                <FormInput
                  type='checkbox'
                  id='sell'
                  onChange={handleChange}
                  checked={formData.type === "sell"}
                />
                <span>Sell</span>
              </Option>
              <Option>
                <FormInput
                  type='checkbox'
                  id='rent'
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </Option>
              <Option>
                <FormInput
                  type='checkbox'
                  id='parking'
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking Spot</span>
              </Option>
              <Option>
                <FormInput
                  type='checkbox'
                  id='furnished'
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </Option>
              <Option>
                <FormInput
                  type='checkbox'
                  id='offer'
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </Option>
            </FormAmenities>

            {/* Bed and Bath Options */}
            <BedBathSection>
              <Option>
                <FormInput
                  type='number'
                  id='beds'
                  min={1}
                  max={10}
                  onChange={handleChange}
                  value={formData.beds}
                />
                <span>Beds</span>
              </Option>

              <Option>
                <FormInput
                  type='number'
                  id='baths'
                  min={1}
                  max={10}
                  onChange={handleChange}
                  value={formData.baths}
                />
                <span>Baths</span>
              </Option>
            </BedBathSection>

            {/* Pricing */}
            <PricesSection>
              <Option>
                <FormInput
                  type='number'
                  id='regularPrice'
                  min={50}
                  max={10000000}
                  name='price'
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <section className='flex flex-col items-center'>
                  <span>Regular Price</span>
                  <span>($ / month)</span>
                </section>
              </Option>
              {formData.offer && (
                <Option>
                  <FormInput
                    type='number'
                    id='discountedPrice'
                    min={0}
                    max={10000000}
                    name='price'
                    onChange={handleChange}
                    value={formData.discountedPrice}
                  />
                  <section className='flex flex-col items-center'>
                    <span>Promotional Price</span>
                    <span>($ / month)</span>
                  </section>
                </Option>
              )}
            </PricesSection>
          </FormOptionsSection>
        </FormInputSection>

        {/* Images */}
        <ImagesSection>
          <p className='font-semibold'>
            Images:
            <span className='ml-2 font-normal text-gray-600'>
              The first image will be the cover (max 6)
            </span>
          </p>

          {/* Image Upload */}
          <section className='flex justify-between gap-4'>
            <FormInput
              type='file'
              id='images'
              accept='image/*'
              multiple
              onChange={(e) => setImages(e.target.files)}
            />

            <FormButton type='button' onClick={handleImageUpload}>
              {uploading ? "Uploading..." : "Upload"}
            </FormButton>
          </section>

          <span className='mt-4 font-semibold'>Or link to an image:</span>

          {/* Image URL */}
          <section className='flex justify-between gap-4'>
            <FormInput type='text' id='url' />

            <FormButton type='button' onClick={handleImageUrlUpload}>
              {uploading ? "Uploading..." : "Upload"}
            </FormButton>
          </section>
          
          <p className='text-sm text-red-700'>
            {imageUploadError && imageUploadError}
          </p>

          {formData.imageUrls.length > 0 && (
            <section className='space-y-4'>
              {formData.imageUrls.map((url, index) => (
                <section
                  key={index}
                  className='flex items-center justify-between p-3 border rounded-lg border-slate-700'
                >
                  <img
                    src={url}
                    alt='Listing Image'
                    className='object-contain w-20 h-20 rounded-lg'
                  />
                  <FormButton
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                  >
                    Delete
                  </FormButton>
                </section>
              ))}
            </section>
          )}
          <FormButton type='submit' disabled={loading || uploading}>
            {loading ? "Creating..." : "Create Listing"}
          </FormButton>
          <p className='text-sm text-red-700'>{submitError && submitError}</p>
        </ImagesSection>
      </CreateListingForm>
    </CreateListingContainer>
  );
};

export default CreateListing;
