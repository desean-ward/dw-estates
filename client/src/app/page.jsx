"use client";

import Home from "@/components/home/home.component";
import PageTransition from "@/components/page-transition/page-transition";

export default function HomePage() {
  return (
    <PageTransition>
      <Home />
    </PageTransition>
  );
}
