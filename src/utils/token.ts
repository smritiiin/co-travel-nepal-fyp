import { useEffect } from "react";

export const useToken = () => {
  const getCookieValue = (name: string) => {
    if(typeof document === "undefined") return undefined; 
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return undefined; // Cookie not found
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
          return currentDate <= expirationDate;
        }
      } catch (error) {
        console.error("Error parsing cookie JSON:", error);
      }
    }
    return true; // Cookie not found or missing expiration date
  };

  const isTokenAvailableAndNotExpired = (cookieName: string): boolean => {
    const token = getCookieValue(cookieName);
    if (token) {
      try {
        const [, payloadBase64] = token.split(".");
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        const expirationTimestamp = payload.exp;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return currentTimestamp <= expirationTimestamp;
      } catch (error) {
        console.error("Error parsing token payload:", error);
      }
    }
    return false;
  };

  useEffect(() => {
    const token = getCookieValue("x-access-token");
    console.log("Token:", token);

    const isTokenExpired = isTokenAvailableAndNotExpired("x-access-token");
    console.log("Is Token Available and Not Expired:", isTokenExpired);
  }, []); // Empty dependency array to run the effect only once

  // Return any additional values or functions you need to use in your component
  return {
    getCookieValue,
    isTokenAvailableAndNotExpired,
  };
};
