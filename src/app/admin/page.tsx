"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Image, Button, Spacer } from "@nextui-org/react";
import NavBar from "./NavBar";
import adminAuth from "@/utils/adminAuth";
import axios from "axios";

const Admin = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [agentsCount, setAgentsCount] = useState(0);
  const [placesCount, setPlacesCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [usersRes, placesRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/user/users"),
          axios.get("http://localhost:8000/api/place/"),
          axios.get("http://localhost:8000/api/package/booking"),
        ]);

        setUsersCount(usersRes.data.length);
        setAgentsCount(1);
        setPlacesCount(placesRes.data.length);
        setBookingsCount(bookingsRes.data.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);
  const router = useRouter();
  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="w-[75%] h-screen p-8">
        <div className="flex gap-6">
          <Card
            className="bg-[#F0F9FF] w-96"
            isHoverable
            isPressable
            onClick={() => router.push("/admin/places")}
          >
            <div className=" p-4">
              <Image
                alt="Places"
                height={50}
                radius="sm"
                src="/images/admin/places.svg"
                width={30}
              />
              <p className="font-bold text-lg text-[#6C6C6C]"> Places</p>
            </div>
            <div className="flex w-full justify-end px-6 font-bold text-2xl">
              {placesCount}
            </div>
          </Card>
          <Card
            className="bg-[#FEF6FB] w-96"
            isHoverable
            isPressable
            onClick={() => router.push("/admin/users")}
          >
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
            <div className="flex justify-end px-6 font-bold text-2xl">
              {usersCount}
            </div>
          </Card>
          <Card
            className="bg-[#FEFBEC] w-96"
            isHoverable
            isPressable
            onClick={() => router.push("/admin/booking")}
          >
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
            <div className="flex justify-end px-6 font-bold text-2xl">
              {bookingsCount}
            </div>
          </Card>
          <Card
            className=" bg-gradient-to-b from-[#00B2FE] from-99% to-white to-1% w-96"
            isHoverable
            isPressable
            onClick={() => router.push("/admin/agent")}
          >
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
            <div className="flex justify-end px-6 font-bold text-2xl">
              {agentsCount}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default adminAuth(Admin);
