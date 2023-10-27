"use client";
import React, { useState } from "react";
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
  UploadLink,
} from "./create-listing.styles";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { firebase } from "@/firebase/firebase.config";

const CreateListing = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  console.log("FORM DATA", formData);

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

  return (
    <CreateListingContainer>
      <CreateListingHeader>Create a Listing</CreateListingHeader>

      <CreateListingForm>
        <FormInputSection>
          <FormInput
            type='text'
            placeholder='Name'
            id='name'
            maxLength='62'
            minLength='10'
            required
          ></FormInput>
          <FormTextArea
            type='text'
            placeholder='Desecription'
            id='description'
            rows='5'
            required
          ></FormTextArea>
          <FormInput
            type='text'
            placeholder='Address'
            id='Address'
            required
          ></FormInput>

          <FormOptionsSection>
            {/* Amenities Options */}
            <FormAmenities>
              <Option>
                <FormInput type='checkbox' id='sell' />
                <span>Sell</span>
              </Option>
              <Option>
                <FormInput type='checkbox' id='rent' />
                <span>Rent</span>
              </Option>
              <Option>
                <FormInput type='checkbox' id='parking' />
                <span>Parking Spot</span>
              </Option>
              <Option>
                <FormInput type='checkbox' id='furnished' />
                <span>Furnished</span>
              </Option>
              <Option>
                <FormInput type='checkbox' id='offer' />
                <span>Offer</span>
              </Option>
            </FormAmenities>

            {/* Bed and Bath Options */}
            <BedBathSection>
              <Option>
                <FormInput type='number' id='beds' min='1' max='10' />
                <span>Beds</span>
              </Option>

              <Option>
                <FormInput type='number' id='baths' min='1' max='10' />
                <span>Baths</span>
              </Option>
            </BedBathSection>

            {/* Pricing */}
            <PricesSection>
              <Option>
                <FormInput type='number' id='regular-price' name='price' />
                <section className='flex flex-col items-center'>
                  <span>Regular Price</span>
                  <span>($ / month)</span>
                </section>
              </Option>
              <Option>
                <FormInput type='number' id='discounted-price' name='price' />
                <section className='flex flex-col items-center'>
                  <span>Discounted Price</span>
                  <span>($ / month)</span>
                </section>
              </Option>
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
          <FormButton type='submit'>Create Listing</FormButton>
        </ImagesSection>
      </CreateListingForm>
    </CreateListingContainer>
  );
};

export default CreateListing;
