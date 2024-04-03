"use client";
import { Button } from "@nextui-org/react";
import React from "react";

const Agent = () => {
  const addPackage = () => {
    window.location.href = "agent/addPackage";
  };
  return (
    <div>
      <h1>Agent Panal</h1>
      <div>
        <Button onClick={addPackage}>Add Package</Button>
        <Button>View Bookings</Button>
      </div>
    </div>
  );
};

export default Agent;
