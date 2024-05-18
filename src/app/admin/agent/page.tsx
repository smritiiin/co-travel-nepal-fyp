"use client";
import { Card, CardBody, Divider } from "@nextui-org/react";
import NavAdmin from "../NavBar";
import adminAuth from "@/utils/adminAuth";

const page = () => {
  return (
    <div className="flex h-screen">
      <NavAdmin />
      <div className="w-[75%] h-screen py-3">
        <div className="flex gap-x-4">
          <h2 className="text-center cursor-point"> Travel Agents</h2>
        </div>
        <Divider />
        <Card>
          {/* <CardBody></CardBody> */}
        </Card>
      </div>
    </div>
  );
};

export default adminAuth(page);
