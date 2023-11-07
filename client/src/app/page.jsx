"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/hero/hero.component";
import ListingItem from "@/components/listing-item/listing-item.component";
import Link from "next/link";

export default function Home() {
  const [promoListings, setPromoListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  useEffect(() => {
    const fetchPromoListings = async () => {
      try {
        const res = await fetch(`${URL}/api/listing/get?offer=true&limit=4`);

        const data = await res.json();
        setPromoListings(data);

        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch the first 4 listings that are for rent
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`${URL}/api/listing/get?type=rent&limit=4`);

        const data = await res.json();
        setRentListings(data);

        fetchSellListings();
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch the first 4 listings that are for sale
    const fetchSellListings = async () => {
      try {
        const res = await fetch(`${URL}/api/listing/get?type=sell&limit=4`);

        const data = await res.json();
        setSellListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPromoListings();
  }, []);
  return (
    <div className='flex flex-col gap-4 pb-16'>
      {/* Hero */}
      <Hero promoListings={promoListings} />

      <div id='listings' className="flex flex-col gap-16">
        {/* Promo Properties */}
        <div className='flex flex-col w-full gap-4 mx-auto max-w-7xl'>
          <section className='flex flex-col'>
            <h2 className='text-2xl font-bold text-slate-700'>
              Recent Promo Properties
            </h2>

            <Link className='hover:underline' href='/search?offer=true'>
              See more promo properties
            </Link>
          </section>

          <section className='flex flex-wrap gap-4'>
            {promoListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </section>
        </div>

        {/* Recent Selling Properties */}
        <div className='flex flex-col w-full gap-4 mx-auto max-w-7xl'>
          <section className='flex flex-col'>
            <h2 className='text-2xl font-bold text-slate-700'>
              Recent Selling Properties
            </h2>

            <Link className='hover:underline' href='/search?type=sell'>
              See more promo properties
            </Link>
          </section>

          <section className='flex flex-wrap gap-4'>
            {sellListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </section>
        </div>

        {/* Recent Rental Properties */}
        <div className='flex flex-col w-full gap-4 mx-auto max-w-7xl'>
          <section className='flex flex-col'>
            <h2 className='text-2xl font-bold text-slate-700'>
              Recent Rental Properties
            </h2>

            <Link className='hover:underline' href='/search?type=rent'>
              See more promo properties
            </Link>
          </section>

          <section className='flex flex-wrap gap-4'>
            {rentListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </section>
        </div>
      </div>

      {/*// TODO ---- CREATE FEATURED AGENTS SECTION}
      {/* Featured Agents */}
    </div>
  );
}
