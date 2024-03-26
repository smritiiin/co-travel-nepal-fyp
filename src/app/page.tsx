"use client";
import LandingPage from "./components/homepage/landingPage";
import Testimonials from "./components/homepage/testimonials";
import PopularDestinations from "./components/homepage/popularDestinations";
import TravelPlans from "./components/homepage/travelPlans";
import TravelStories from "./components/homepage/travelStories";

import { useEffect } from "react";
import WhyUs from "./components/homepage/whyus";

export default function Home() {
    return (
    <div className=" flex flex-col gap-10">
      <LandingPage />
      <PopularDestinations />
      <WhyUs />
      <TravelStories />
      <TravelPlans />
      <Testimonials />
    </div>
  );
}
