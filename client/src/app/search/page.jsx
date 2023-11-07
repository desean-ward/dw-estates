import React from "react";
import Search from "@/components/search/search.component";
import PageTransition from "@/components/page-transition/page-transition";

const SearchPage = () => {
  return (
    <PageTransition>
      <Search />
    </PageTransition>
  );
};

export default SearchPage;
