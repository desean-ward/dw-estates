"use client";
import { useEffect, useState, lazy, Suspense } from "react";
const Hero = lazy(() => import("@/components/hero/hero.component"));
const ListingItem = lazy(() =>
  import("@/components/listing-item/listing-item.component")
);

import Link from "next/link";
import {
  HomeContainer,
  ListingsContainer,
  Properties,
  PropertiesSection,
  PropertiesSectionHeader,
} from "./home.styles";

import TheAgents from "../the-agents/the-agents.component";
import Loading from "../loading/loading.component";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [promoListings, setPromoListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [agents, setAgents] = useState([]);

  const [promoRef, inView] = useInView();
  const [sellRef, sellInView] = useInView();
  const [rentRef, rentInView] = useInView();
  const promoAnimation = useAnimation();
  const sellAnimation = useAnimation();
  const rentAnimation = useAnimation();

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

  // Animate into view
  useEffect(() => {
    if (inView) {
      promoAnimation.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.5,
          bounce: 0.3,
          delay: 0.5,
        },
      });
    }
    if (!inView) {
      promoAnimation.start({
        y: 0,
        opacity: 0,
        transition: { type: "spring", duration: 1.5, bounce: 0.3 },
      });
    }

    if (sellInView) {
      sellAnimation.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.5,
          bounce: 0.3,
          delay: 0.5,
        },
      });
    }
    if (!sellInView) {
      sellAnimation.start({
        y: 0,
        opacity: 0,
        transition: { type: "spring", duration: 1.5, bounce: 0.3 },
      });
    }

    if (rentInView) {
      rentAnimation.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1.5,
          bounce: 0.3,
          delay: 0.5,
        },
      });
    }
    if (!rentInView) {
      rentAnimation.start({
        y: 0,
        opacity: 0,
        transition: { type: "spring", duration: 1.5, bounce: 0.3 },
      });
    }
  }, [inView, sellInView, rentInView]);
  return (
    <HomeContainer>
      {/* Hero */}
      <Hero promoListings={promoListings} />

      {/* Featured Properties */}
      <ListingsContainer>
        {/* Promo Properties */}
        <motion.div
          ref={promoRef}
          initial={{ y: 100, opacity: 0 }}
          animate={promoAnimation}
        >
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
                <Suspense fallback={<Loading />}>
                  <ListingItem key={listing._id} listing={listing} />
                </Suspense>
              ))}
            </Properties>
          </PropertiesSection>
        </motion.div>

        {/* Recent Selling Properties */}
        <motion.div
          ref={sellRef}
          initial={{ y: 100, opacity: 0 }}
          animate={sellAnimation}
        >
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
                <Suspense fallback={<Loading />}>
                  <ListingItem key={listing._id} listing={listing} />
                </Suspense>
              ))}
            </Properties>
          </PropertiesSection>
        </motion.div>

        {/* Recent Rental Properties */}
        <motion.div
          ref={rentRef}
          initial={{ y: 100, opacity: 0 }}
          animate={rentAnimation}
        >
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
                <Suspense fallback={<Loading />}>
                  <ListingItem key={listing._id} listing={listing} />
                </Suspense>
              ))}
            </Properties>
          </PropertiesSection>
        </motion.div>
      </ListingsContainer>

      {/* Featured Agents */}
      <TheAgents agents={agents} />
    </HomeContainer>
  );
}
