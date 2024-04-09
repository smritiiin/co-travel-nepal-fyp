"use client";
import { useEffect } from "react";

export const useToken = () => {
  const getCookieValue = (name: string): string | undefined => {
    if (typeof document === "undefined") return undefined;
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return undefined; // Cookie not found
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

  const getUsernameAndRoleFromToken = (
    cookieName: string
  ): { username: string; role: string; id: number } => {
    if (!isTokenAvailableAndNotExpired("x-access-token")) {
      return { username: "Guest", role: "guest", id: -1 };
    }
    const token = getCookieValue(cookieName);
    let username = "";
    let role = "";
    let id = 0;

    if (token) {
      try {
        const [, payloadBase64] = token.split(".");
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        username = payload.username;
        role = payload.role;
        id = payload.id;
      } catch (error) {
        console.error("Error parsing token payload:", error);
      }
    }

    return { username, role, id };
  };

  useEffect(() => {
    // const token = getCookieValue("x-access-token");
    // console.log("Token:", token);

    const isTokenExpired = isTokenAvailableAndNotExpired("x-access-token");
    // console.log("Is Token Available and Not Expired:", isTokenExpired);

    const { username, role, id } =
      getUsernameAndRoleFromToken("x-access-token");
    // console.log("Username:", username);
    // console.log("Role:", role);
    // console.log("ID:", id);
  }, []); // Empty dependency array to run the effect only once

  // Return any additional values or functions you need to use in your component
  return {
    // getCookieValue,
    isTokenAvailableAndNotExpired,
    getUsernameAndRoleFromToken,
  };
};
