"use client";
import LandingImage from "@/components/homepage/landingImage";
import Testimonials from "@/components/homepage/testimonials";
import TopPlaces from "@/components/homepage/topPlaces";
import TravelPlans from "@/components/homepage/travelPlans";
import TravelStories from "@/components/homepage/travelStories";

export default function Home() {
  return (
    <div>
      <LandingImage />
      <TopPlaces />
      <TravelStories/>
      <TravelPlans/>
      <Testimonials/>
    </div>
  );
}
