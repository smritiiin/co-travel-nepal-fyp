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
import { useEffect, useState } from "react";
import axios from "axios";

const TravellerData = () => {
  const [travellerData, setTravellerData] = useState<any[]>([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:8000/api/profile").then(function (response) {

        const travellerProfiles = response.data.filter(
          (profile: any) => profile.Type === "Traveller"
        );
        if (travellerProfiles.length > 0) {
          setTravellerData(travellerProfiles);
          console.log(travellerProfiles);
        } else {
          console.log("No traveller profiles found");
        }
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }, []);

  return (
    <Table className="font-thin">
      <TableHeader>
        <TableColumn>.</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Nationality</TableColumn>
        <TableColumn>Contact Number</TableColumn>
      </TableHeader>
      <TableBody>
        {travellerData.map((item) => (
          <TableRow className="mb-2 items-center border" key={item.ProfileId}>
            <TableCell>
              {item.ProfilePicture ? (
                <Image
                  alt="Card background"
                  className="rounded-xl"
                  src={`http://localhost:8000/${item.UserProfile.ProfilePicture}`}
                  width={100}
                  height={100}
                  onError={() => console.error("Failed to load image")}
                  key={item.Image}
                />
              ) : (
                <Avatar alt="Avatar" className="rounded-xl" />
              )}
            </TableCell>
            <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-semibold ">
                {item.UserProfile.fname} {item.UserProfile.lname}
              </h4>
            </TableCell>
            <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
              <small className="text-default-500">{item.Nationality}</small>
            </TableCell>
            <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
              <small className="text-default-500">{item.ContactNumber}</small>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TravellerData;
