import Listing from "@/components/listing/listing.component";
import PageTransition from "@/components/page-transition/page-transition";
import React from "react";

const ListingPage = () => {
  return (
    <PageTransition>
      <Listing />
    </PageTransition>
  );
};

export default ListingPage;
