"use client";
import NavAdmin from "../NavBar";
import { Divider } from "@nextui-org/react";
import { useState } from "react";
import UserData from "@/app/components/admin/Users";
import TravellerData from "@/app/components/admin/Travellers";
import GuideData from "@/app/components/admin/Guide";

const Users = () => {
  const [selectedTab, setSelectedTab] = useState("users");

  const handleTabChange = (tab: any) => {
    setSelectedTab(tab);
  };

  const renderUsers = () => {
    return <UserData />;
  };

  const renderTravelers = () => {
    return <TravellerData />;
  };

  const renderGuides = () => {
    return <GuideData />;
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "users":
        return renderUsers();
      case "travelers":
        return renderTravelers();
      case "guides":
        return renderGuides();
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <NavAdmin />
      <div className="w-[75%] h-screen py-3">
        {/* <SearchBar /> */}
        <div className="flex gap-x-4">
          <h2
            className={`text-center cursor-pointer ${
              selectedTab === "users" ? "font-bold text-green-600" : ""
            }`}
            onClick={() => handleTabChange("users")}
          >
            Users
          </h2>
          <h2
            className={`text-center cursor-pointer ${
              selectedTab === "travelers" ? "font-bold text-green-600" : ""
            }`}
            onClick={() => handleTabChange("travelers")}
          >
            Travelers
          </h2>
          <h2
            className={`text-center cursor-pointer ${
              selectedTab === "guides" ? "font-bold text-green-600" : ""
            }`}
            onClick={() => handleTabChange("guides")}
          >
            Guides
          </h2>
        </div>
        <Divider />
        <br/>
        {renderContent()}
      </div>
    </div>
  );
};

export default Users;
