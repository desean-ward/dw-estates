import React from "react";
import {
  ListingImage,
  ListingImageContainer,
  ListingItemContainer,
} from "./listing-item.styles";

import Link from "next/link";

import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ listing }) => {
  return (
    <Link href={`/listing/${listing._id}`}>
      <ListingItemContainer>
        <ListingImageContainer>
          <ListingImage src={listing.imageUrls[0]} width='500' height='400' alt='listing image' />
        </ListingImageContainer>
        <div className="flex flex-col justify-between gap-4 p-4">
          <h3 className='text-lg font-semibold truncate text-slate-700'>
            {listing.title}
          </h3>
          
          <section id='address' className='flex items-center gap-1'>
            <MdLocationOn className='text-green-700' />
            <p className='text-sm truncate text-slate-600'>{listing.address}</p>
          </section>
          
          <section id='description'>
            <p className='text-sm text-slate-600 line-clamp-2'>
              {listing.description}
            </p>
          </section>
          
          <section id='price'>
            <p className='text-lg font-semibold text-slate-500'>
              $
              {listing.offer
                ? listing.discountedPrice.toLocaleString("en-us")
                : listing.regularPrice.toLocaleString("en-us")}
              {listing.type === "rent" ? (
                <span className='text-sm'> / month</span>
              ) : (
                ""
              )}
            </p>
          </section>
          
          <section
            id='bed-bath'
            className='flex gap-4 text-sm font-bold text-slate-700'
          >
            <span>
              {listing.beds === 1
                ? `${listing.beds} bed`
                : `${listing.beds} beds`}
            </span>
          
            <span>
              {listing.baths === 1
                ? `${listing.baths} bath`
                : `${listing.baths} baths`}
            </span>
          </section>
        </div>
      </ListingItemContainer>
    </Link>
  );
};

export default ListingItem;
