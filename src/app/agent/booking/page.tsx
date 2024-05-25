"use client";

import {
  Image,
  Divider,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  Avatar,
} from "@nextui-org/react";
import NavAgent from "../NavAgent.tsx";
import React, { useState, useEffect } from "react";
import axios from "axios";
import agentAuth from "@/utils/agentAuth";

const Booking = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/package/booking"
        );
        console.log(response.data);
        setBookingData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBookingData();
  }, []);

  return (
    <div className="flex h-screen gap-5">
      <NavAgent />
      <div className="w-full">
        <h2>Bookings</h2>

        <Table
          aria-label="Example table with custom cells"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <TableHeader>
            <TableColumn>Booking ID</TableColumn>
            <TableColumn>Package </TableColumn>
            <TableColumn>User ID</TableColumn>
            <TableColumn>No. of Persons</TableColumn>
            <TableColumn>Start Date</TableColumn>
            <TableColumn>End Date</TableColumn>
            <TableColumn>Payment Status</TableColumn>
          </TableHeader>
          <TableBody>
            {bookingData.map((booking) => (
              <TableRow key={booking.BookingId}>
                <TableCell>{booking.BookingId}</TableCell>
                <TableCell>{booking.Package.Name}</TableCell>
                <TableCell>
                  {booking.User.fname} {booking.User.lname}
                </TableCell>
                <TableCell>{booking.NoOfPerson}</TableCell>
                <TableCell>{booking.StartDate}</TableCell>
                <TableCell>{booking.EndDate}</TableCell>
                <TableCell>{booking.Payment ? "Paid" : "Unpaid"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default agentAuth(Booking);
