"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import NavAgent from "./NavAgent";
import agentAuth from "@/utils/agentAuth";

const Agent = () => {
  const addPackage = () => {
    window.location.href = "agent/addPackage";
  };
  return (
    <div className="flex h-screen gap-5">
      <NavAgent />
      <div className= "flex items-center flex-col">
        <h1>Agent Panal</h1>
        <div className="flex gap-4">
          <Button onClick={addPackage}>Add Package</Button>
          <Button>View Bookings</Button>
        </div>
      </div>
    </div>
  );
};

export default agentAuth(Agent);
