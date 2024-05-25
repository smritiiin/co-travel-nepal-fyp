"use client";
import { Button, Divider, Input, Textarea, Image } from "@nextui-org/react";
import React, { useState } from "react";
import { useToken } from "@/utils/token";

const CreateProfile = () => {
  const [displayForm, setDisplayForm] = useState(true);
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  // const [editFormVisible, setEditFormVisible] = useState(true);
  const { getUsernameAndRoleFromToken } = useToken();

  const handlePortfolioButtonClick = () => {
    setDisplayForm(false);
    setPortfolioVisible(true);
  };
  const handleEditButtonClick = () => {
    setDisplayForm(true);
    setPortfolioVisible(false);
  };
  const handleFormCancel = () => {
    setDisplayForm(true);
    setPortfolioVisible(false);
  };

  return (
    <div>
      <div className="bg-[#E0F3FC] pt-5 pl-3">
        <h2>Settings</h2>
        <div className="flex gap-3">
          <h3 onClick={handleEditButtonClick} className=" cursor-pointer">
            Edit
          </h3>
          <h3 onClick={handlePortfolioButtonClick} className=" cursor-pointer">
            Portfolio
          </h3>
        </div>
        <Divider className=" m-1" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className=" flex flex-col gap-5">
          <div className=" z-0">
            <Image
              src="/images/profile/banner.png"
              alt="Cover Image"
              width={500}
              height={500}
              className=" w-full object-cover "
            ></Image>
          </div>
          <div className="flex justify-center items-center -mt-20 z-10 ">
            <Image
              src="/images/user.svg"
              alt="User"
              width={100}
              height={20}
              className="border-2 border-gray-500 rounded-full"
            ></Image>
          </div>
          <div className="text-center">
            <h2>{getUsernameAndRoleFromToken("x-access-token").username}</h2>
            <h4 className=" text-[#6C6C6C]">
              {getUsernameAndRoleFromToken("x-access-token").role}
            </h4>
            <p className="font-bold"> I love travellinggg yeyyyy!</p>
          </div>
        </div>

        <div className="h-fit">
          <Divider orientation="vertical" className="" />
          <div>
            <div className="flex justify-between">
              <h3>BASIC INFO</h3>
              <div>
                {portfolioVisible ? (
                  <Button onClick={handleFormCancel}>Cancel</Button>
                ) : (
                  <Button>Cancel</Button>
                )}
                <Button>Save</Button>
              </div>
            </div>
            {displayForm && (
              <div className="grid grid-cols-2 gap-5">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
                <Input placeholder="Email" />
                <Textarea placeholder="About Me" />
              </div>
            )}
            {portfolioVisible && (
              <div>
                <Input placeholder="Portfolio Field 1" />
                <Input placeholder="Portfolio Field 2" />
                <Input placeholder="Portfolio Field 3" />
                <Button onClick={handleFormCancel}>Cancel</Button>
                <Button>Save</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
