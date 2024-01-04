"use client";
import LandingPage from "@/components/homepage/landingPage";
import Testimonials from "@/components/homepage/testimonials";
import PopularDestinations from "@/components/homepage/popularDestinations";
import TravelPlans from "@/components/homepage/travelPlans";
import TravelStories from "@/components/homepage/travelStories";

export default function Home() {
  return (
    <div className="">
      <LandingPage />

      <PopularDestinations />
      <TravelStories />
      <TravelPlans />
      <Testimonials />
    </div>
  );
}
