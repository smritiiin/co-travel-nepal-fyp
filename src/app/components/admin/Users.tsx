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

const UserData = () => {
  const [userData, setUserData] = useState<any[]>([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8000/api/user/users")
        .then(function (response) {
          console.log(response.data);
          setUserData(response.data);
        })
        .catch(function (error) {
          console.log(error);
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
        <TableColumn>E-mail</TableColumn>
        <TableColumn>Joined Date</TableColumn>
      </TableHeader>
      <TableBody>
        {userData.map((item) => (
          <TableRow className="mb-2 items-center border" key={item.id}>
            <TableCell>
              {item.ProfilePicture ? (
                <Image
                  alt="Card background"
                  className="rounded-xl"
                  src={`http://localhost:8000/${item.ProfilePicture}`}
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
              <h4 className=" font-semibold">
                {item.fname} {item.lname}
              </h4>
            </TableCell>
            <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
              <small className="text-default-500">{item.email}</small>
            </TableCell>
            <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
              <small className="text-default-500">
                {new Date(item.createdAt).toLocaleDateString("en-US", {
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
  );
};

export default UserData;
