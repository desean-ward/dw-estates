import React from "react";
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

const CreateListing = () => {
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
            <FormInput type='file' id='images' accept='image/*' multiple />

            <UploadLink href='#'>Upload</UploadLink>
          </section>

          <FormButton type='submit'>Create Listing</FormButton>
        </ImagesSection>
      </CreateListingForm>
    </CreateListingContainer>
  );
};

export default CreateListing;
