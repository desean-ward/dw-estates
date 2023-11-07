import CreateListing from "@/components/create-listing/create-listing.component";
import PageTransition from "@/components/page-transition/page-transition";
import React from "react";

const CreateListingPage = () => {
  return (
    <PageTransition>
      <CreateListing />
    </PageTransition>
  );
};

export default CreateListingPage;
