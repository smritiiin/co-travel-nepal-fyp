"use client";

import { Button, Divider, Table } from "@nextui-org/react";
import NavBar from "../NavBar";
import SearchBar from "../SearchBar";
import { useRouter } from "next/navigation";
import NavAdmin from "../NavBar";

export default function Places() {
  const router = useRouter();

  const addPlace = () => {
    console.log("Clickedddd");
    router.push("/admin/places/addPlace");
  };

  return (
    <div className="h-screen flex">
      <NavAdmin />
      <div className="w-[75%] h-screen py-3">
        <SearchBar />

        <div className="bg-[#F8F8F8] p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Places</h2>
            <Button color="primary" onPress={addPlace}>
              Add Places
            </Button>
          </div>
          <Divider />
          {/* <table>
            <thead>Place</thead>
            <thead>State</thead>
            <thead>Description</thead>
            <thead>Location</thead>
          </table> */}
        </div>
      </div>
    </div>
  );
}
