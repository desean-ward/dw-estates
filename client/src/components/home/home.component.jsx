"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/hero/hero.component";
import ListingItem from "@/components/listing-item/listing-item.component";
import Link from "next/link";
import {
  HomeContainer,
  ListingsContainer,
  Properties,
  PropertiesSection,
  PropertiesSectionHeader,
} from "./home.styles";

import TheAgents from "../the-agents/the-agents.component";

export default function Home() {
  const [promoListings, setPromoListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [agents, setAgents] = useState([]);

  const URL = process.env.NEXT_PUBLIC_APP_SERVER_URL;

  useEffect(() => {
    const fetchPromoListings = async () => {
      try {
        const res = await fetch(`${URL}/api/listing/get?offer=true&limit=4`, {
          method: "GET",
          credentials: "include",
          sameSite: "none",
          secure: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

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
        const res = await fetch(`${URL}/api/listing/get?type=rent&limit=4`, {
          method: "GET",
          credentials: "include",
          sameSite: "none",
          secure: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

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
        const res = await fetch(`${URL}/api/listing/get?type=sell&limit=4`, {
          method: "GET",
          credentials: "include",
          sameSite: "none",
          secure: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setSellListings(data);

        fetchAgents();
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch the first 4 listings that are for rent
    const fetchAgents = async () => {
      try {
        const res = await fetch(`${URL}/api/user/agents`, {
          method: "GET",
          credentials: "include",
          sameSite: "none",
          secure: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setAgents(data);
        
      } catch (error) {
        console.log(error);
        console.log(error);
      }
    };

    fetchPromoListings();
  }, []);
  return (
    <HomeContainer>
      {/* Hero */}
      <Hero promoListings={promoListings} />

      {/* Featured Properties */}
      <ListingsContainer>
        {/* Promo Properties */}
        <PropertiesSection>
          <PropertiesSectionHeader>
            <h2 className='text-2xl font-bold text-slate-700'>
              Recent Promoted Properties
            </h2>

            <Link
              className='hover:text-[var(--clr-text-accent)] w-fit'
              href='/search?offer=true'
            >
              See more promoted properties
            </Link>
          </PropertiesSectionHeader>

          <Properties>
            {promoListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </Properties>
        </PropertiesSection>

        {/* Recent Selling Properties */}
        <PropertiesSection>
          <PropertiesSectionHeader>
            <h2 className='text-2xl font-bold text-slate-700'>
              Recent Selling Properties
            </h2>

            <Link
              className='hover:text-[var(--clr-text-accent)] w-fit'
              href='/search?type=sell'
            >
              See more properties for sell
            </Link>
          </PropertiesSectionHeader>

          <Properties>
            {sellListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </Properties>
        </PropertiesSection>

        {/* Recent Rental Properties */}
        <PropertiesSection>
          <PropertiesSectionHeader>
            <h2 className='text-2xl font-bold text-slate-700'>
              Recent Rental Properties
            </h2>

            <Link
              className='hover:text-[var(--clr-text-accent)] w-fit'
              href='/search?type=rent'
            >
              See more rental properties
            </Link>
          </PropertiesSectionHeader>

          <Properties>
            {rentListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </Properties>
        </PropertiesSection>
      </ListingsContainer>

      {/* Featured Agents */}
      <TheAgents agents={agents} />
    </HomeContainer>
  );
}
