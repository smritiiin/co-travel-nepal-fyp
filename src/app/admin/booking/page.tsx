"use client";
import NavAdmin from "../NavBar";
import {
  Divider,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  Avatar,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Booking = () => {
  const [bookingData, setBookingData] = useState<any[]>([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8000/api/package/booking")
        .then(function (response) {
          console.log(response.data);
          setBookingData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }, []);
  return (
    <div className="flex h-screen">
      <NavAdmin />
      <div className="w-[75%] h-screen py-3">
        {/* <SearchBar /> */}
        <div className="flex gap-x-4">
          <h2 className="text-center cursor-point">Booking</h2>
        </div>
        <Divider />
        <br />
        <Table className="font-thin ml-2">
          <TableHeader>
            <TableColumn>User</TableColumn>
            <TableColumn>Package</TableColumn>
            <TableColumn>No of Person</TableColumn>
            <TableColumn>Duration</TableColumn>
          </TableHeader>
          <TableBody>
            {bookingData.map((item) => (
              <TableRow
                className="mb-2 items-center border"
                key={item.BookingId}
              >
                <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-semibold">
                    {item.User.fname} {item.User.lname}
                  </h4>
                </TableCell>

                <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="">{item.Package.Name}</h4>
                </TableCell>
                <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
                  <small className="text-default-500">{item.NoOfPerson}</small>
                </TableCell>
                <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
                  <small className="text-default-500">
                    {new Date(item.StartDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                    ,
                    {new Date(item.EndDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </small>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Booking;
