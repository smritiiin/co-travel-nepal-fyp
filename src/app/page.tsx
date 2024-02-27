"use client";
import LandingPage from "./components/homepage/landingPage";
import Testimonials from "./components/homepage/testimonials";
import PopularDestinations from "./components/homepage/popularDestinations";
import TravelPlans from "./components/homepage/travelPlans";
import TravelStories from "./components/homepage/travelStories";

import { useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function Home() {
  useEffect(() => {
    const getCookieValue = (name: string): string => {
      const cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
          return cookie[1];
        }
      }
      return "";
    };

    const isCookieExpired = (cookieName: string): boolean => {
      const cookieValue = getCookieValue(cookieName);
      if (cookieValue) {
        try {
          const decodedCookie = decodeURIComponent(cookieValue);
          const cookieData = JSON.parse(decodedCookie);
          if (cookieData.expires) {
            const expirationDate = new Date(cookieData.expires);
            const currentDate = new Date();
            return currentDate > expirationDate;
          }
        } catch (error) {
          console.error("Error parsing cookie JSON:", error);
        }
      }
      return true; // Cookie not found or missing expiration date
    };

    const token = getCookieValue("x-access-token");
    console.log("Token:", token);

    const isTokenExpired = isCookieExpired("x-access-token");
    console.log("Is Token Expired:", isTokenExpired);
  }, []);

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
