"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/hero/hero.component";

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
        console.log(data);
        setSellListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPromoListings();
  }, []);
  return (
    <div>
      {/* Hero */}
      <Hero promoListings={promoListings} />

      {/* Featured Properties */}

      {/* Featured Agents */}
    </div>
  );
}
