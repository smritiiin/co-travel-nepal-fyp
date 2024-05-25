"use client";
import {
  Button,
  Divider,
  Input,
  Textarea,
  Image,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useToken } from "@/utils/token";
import axios from "axios";
const CreateProfile = () => {
  const [displayForm, setDisplayForm] = useState(true);
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const { getUsernameAndRoleFromToken } = useToken();
  const [profileId, setProfileId] = useState(0);

  // State for Basic Info
  const [basicInfo, setBasicInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    aboutMe: "",
  });

  // State for Portfolio
  const [portfolio, setPortfolio] = useState({
    Type: "Traveller",
    Nationality: "",
    Contact: "",
    Languages: "",
    Interests: "",
    TravellingTo: "",
    TravelPreferences: "",
    TravelExperiences: "",
  });

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

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "basicInfo") {
      setBasicInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setPortfolio((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveBasicInfo = async () => {
    try {
      const response = await fetch("/api/saveBasicInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(basicInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to save basic info");
      }

      // Handle success (e.g., show a success message, update UI)
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  };
  const id = getUsernameAndRoleFromToken("x-access-token").id;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/userprofile/${id}`
        );
        console.log(response);
        setProfileId(response.data.ProfileId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileData();
  }, [id]);
  console.log("ProfileID", profileId);

  const handleSavePortfolio = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/profile/update/${profileId}`,
        {portfolio}
      );
      console.log(response.data);
      if (!response.ok) {
        throw new Error("Failed to save portfolio");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-5">
      <div className="bg-[#E0F3FC] pt-5 pl-3">
        <h2>Settings</h2>
        <div className="flex gap-3">
          <h3 onClick={handleEditButtonClick} className="cursor-pointer">
            Settings
          </h3>
          <h3 onClick={handlePortfolioButtonClick} className="cursor-pointer">
            Portfolio
          </h3>
        </div>
        <Divider className="m-1" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-5">
          <div className="z-0">
            <Image
              src="/images/profile/banner.png"
              alt="Cover Image"
              width={500}
              height={500}
              className="w-full object-cover"
            />
          </div>
          <div className="flex justify-center items-center -mt-20 z-10">
            <Image
              src="/images/user.svg"
              alt="User"
              width={100}
              height={20}
              className="border-2 border-gray-500 rounded-full"
            />
          </div>
          <div className="text-center">
            <h2>{getUsernameAndRoleFromToken("x-access-token").username}</h2>
            <h4 className="text-[#6C6C6C]">
              {getUsernameAndRoleFromToken("x-access-token").role}
            </h4>
            <p className="font-bold">I love travellinggg yeyyyy!</p>
          </div>
        </div>

        <div className="h-fit">
          <Divider orientation="vertical" />
          <div>
            {displayForm && (
              <>
                <div className="flex justify-between">
                  <h3>BASIC INFO</h3>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <Input
                    placeholder="First Name"
                    name="firstName"
                    value={basicInfo.firstName}
                    onChange={(e) => handleInputChange(e, "basicInfo")}
                  />
                  <Input
                    placeholder="Last Name"
                    name="lastName"
                    value={basicInfo.lastName}
                    onChange={(e) => handleInputChange(e, "basicInfo")}
                  />
                  <Input
                    placeholder="Email"
                    name="email"
                    value={basicInfo.email}
                    onChange={(e) => handleInputChange(e, "basicInfo")}
                  />
                  <Textarea
                    placeholder="About Me"
                    name="aboutMe"
                    value={basicInfo.aboutMe}
                    onChange={(e) => handleInputChange(e, "basicInfo")}
                    className="col-span-2"
                  />
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button onClick={handleFormCancel}>Cancel</Button>
                    <Button onClick={handleSaveBasicInfo}>Save</Button>
                  </div>
                </div>
              </>
            )}
            {portfolioVisible && (
              <>
                <div className="flex justify-between">
                  <h3>TRAVELLER PROFILE</h3>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <RadioGroup
                      label="I am a:"
                      orientation="horizontal"
                      name="Type"
                      value={portfolio.Type}
                      onChange={(e) =>
                        setPortfolio((prev) => ({
                          ...prev,
                          Type: e.target.value,
                        }))
                      }
                    >
                      <Radio value="Traveller">Traveller</Radio>
                      <Radio value="Guide">Guide</Radio>
                      <Radio value="ServiceProvider">Service Provider</Radio>
                    </RadioGroup>
                  </div>
                  <Input
                    placeholder="Nationality"
                    name="Nationality"
                    value={portfolio.Nationality}
                    onChange={(e) => handleInputChange(e, "portfolio")}
                  />
                  <Input
                    placeholder="Contact"
                    name="Contact"
                    value={portfolio.Contact}
                    onChange={(e) => handleInputChange(e, "portfolio")}
                  />
                  <Input
                    placeholder="Languages"
                    name="Languages"
                    value={portfolio.Languages}
                    onChange={(e) => handleInputChange(e, "portfolio")}
                  />
                  <Input
                    placeholder="Interests"
                    name="Interests"
                    value={portfolio.Interests}
                    onChange={(e) => handleInputChange(e, "portfolio")}
                  />
                  <Input
                    placeholder="Travelling To"
                    name="TravellingTo"
                    value={portfolio.TravellingTo}
                    onChange={(e) => handleInputChange(e, "portfolio")}
                  />
                  <Input
                    placeholder="Travel Preferences"
                    name="TravelPreferences"
                    value={portfolio.TravelPreferences}
                    onChange={(e) => handleInputChange(e, "portfolio")}
                  />
                  <Input
                    placeholder="Travel Experiences"
                    name="TravelExperiences"
                    value={portfolio.TravelExperiences}
                    onChange={(e) => handleInputChange(e, "portfolio")}
                    className="col-span-2"
                  />
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button onClick={handleFormCancel}>Cancel</Button>
                    <Button onClick={handleSavePortfolio}>Save</Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
