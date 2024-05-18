"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Image, Button, Spacer } from "@nextui-org/react";
import NavBar from "./NavBar";
import { useToken } from "@/utils/token";
import adminAuth from "@/utils/adminAuth";

const Admin = () => {
  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="w-[75%] h-screen p-8">
        <div className="flex gap-6">
          <Card className="bg-[#F0F9FF] w-96">
            <div className=" p-4">
              <Image
                alt="Places"
                height={50}
                radius="sm"
                src="/images/admin/places.svg"
                width={40}
              />
              <p className="font-bold text-lg text-[#6C6C6C]"> Places</p>
            </div>
            <div className="flex justify-end px-6 font-bold text-2xl">246</div>
          </Card>
          <Card className="bg-[#FEF6FB] w-96">
            <div className=" p-4">
              <Image
                alt="Users"
                height={50}
                radius="sm"
                src="/images/admin/users.svg"
                width={40}
              />
              <p className="font-bold text-lg text-[#6C6C6C]"> Users</p>
            </div>
            <div className="flex justify-end px-6 font-bold text-2xl">246</div>
          </Card>
          <Card className="bg-[#FEFBEC] w-96">
            <div className=" p-4">
              <Image
                alt="Booking"
                height={50}
                radius="sm"
                src="/images/admin/booking.svg"
                width={40}
              />
              <p className="font-bold text-lg text-[#6C6C6C]"> Bookings</p>
            </div>
            <div className="flex justify-end px-6 font-bold text-2xl">246</div>
          </Card>
          <Card className=" bg-gradient-to-b from-[#00B2FE] from-99% to-white to-1% w-96">
            <div className=" p-4">
              <Image
                alt="Agent"
                height={50}
                radius="sm"
                src="/images/admin/agent.svg"
                width={40}
              />
              <p className="font-bold text-lg text-[#6C6C6C]"> Agents</p>
            </div>
            <div className="flex justify-end px-6 font-bold text-2xl">246</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default adminAuth(Admin);
