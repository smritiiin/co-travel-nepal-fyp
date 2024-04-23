"use client"
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import Profile from "../page";

const CreateProfile = () => {
  const [displayForm, setDisplayForm] = useState(true);
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  // const [editFormVisible, setEditFormVisible] = useState(true);

  const handlePortfolioButtonClick = () => {
    setDisplayForm(false);
    setPortfolioVisible(true);
  };
const handleEditButtonClick = () => {
  setDisplayForm(true);
  setPortfolioVisible(false)
};
  const handleFormCancel = () => {
    setDisplayForm(true);
    setPortfolioVisible(false);
  };

  return (
    <div>
      <div className="bg-[#E0F3FC] pt-5">
        <h2>Settings</h2>
        <div className="flex gap-3">
          <h3 onClick={handleEditButtonClick}>Edit</h3>
          <h3 onClick={handlePortfolioButtonClick}>Portfolio</h3>
        </div>
        <Divider className="" />
      </div>

      <div className="grid grid-cols-2">
        <Profile />

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
