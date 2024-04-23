"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import NavAgent from "./NavAgent";

const Agent = () => {
  const addPackage = () => {
    window.location.href = "agent/addPackage";
  };
  return (
    <div className="flex h-screen">
      <NavAgent />
      <div>
        <h1>Agent Panal</h1>
        <div>
          <Button onClick={addPackage}>Add Package</Button>
          <Button>View Bookings</Button>
        </div>
      </div>
    </div>
  );
};

export default Agent;
