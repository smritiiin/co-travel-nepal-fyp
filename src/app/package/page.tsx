"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "@/utils/token";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Loading from "../components/Loading";
import { LoginCard } from "../components/LoginCard";

const Packages = () => {
  const { getCookieValue, isTokenAvailableAndNotExpired } = useToken();

  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div>
      <div className="min-h-screen">PACKAGES</div>
      <div>
        <h1> Our Packages </h1>
        <h3>descriptionnn</h3>
        <div>
          <Card></Card>
        </div>
      </div>
    </div>
  );
};
export default Packages;
