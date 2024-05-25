"use client";
import { useState, useEffect } from "react";
import { Avatar, Button, Divider, Image } from "@nextui-org/react";
import axios from "axios";
import {
  FaLocationArrow,
  FaLanguage,
  FaUserCircle,
  FaCalendarAlt,
  FaUserTag,
  FaPhoneAlt,
  FaUserTie,
} from "react-icons/fa";
import { GiTravelDress } from "react-icons/gi";

const ViewProfile = ({ params }: { params: { profileId: string } }) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/${params.profileId}`
        );
        setProfileData(response.data);
        setIsLoading(false);
        console.log(response);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [params.profileId]);

  if (isLoading) {
    return <p>Loading profile data...</p>;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="z-0">
        <Image
          src="/images/profile/banner.png"
          alt="Cover Image"
          width={1500}
          height={500}
          className="w-[1444px] h-[350px] object-cover"
        />
      </div>
      <div className="flex justify-center items-center -mt-20 z-10">
        <Image
          src="/images/user.svg"
          alt="User"
          width={130}
          height={20}
          className="border-2 border-gray-500 rounded-full"
        />
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          {profileData.UserProfile.fname} {profileData.UserProfile.lname}
        </h2>
        <h4 className="text-[#6C6C6C] text-lg">
          {profileData.Nationality}, {profileData.Type}
        </h4>
        <p className="font-bold text-lg">I love travellinggg yeyyyy!</p>
      </div>

      <div className="p-5 grid grid-cols-2 gap-4 bg-white shadow-lg rounded-lg">
        <div className="flex items-start mb-4">
          <FaUserTag className="text-2xl mr-4" />
          <div>
            <h3 className="text-xl font-bold">User Information</h3>
            <ul className=" pl-1 text-gray-600">
              <li>
                <FaUserTie className="inline-block mr-2" />
                Gender: {profileData.Gender}
              </li>
              <li>
                <FaPhoneAlt className="inline-block mr-2" />
                Contact Number: {profileData.ContactNumber}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <FaLanguage className="text-2xl mr-4" />
          <div>
            <h3 className="text-xl font-bold">Languages</h3>
            <ul className="list-disc pl-6 text-gray-600">
              {profileData.Languages.map((language: any, index: number) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <FaCalendarAlt className="text-2xl mr-4" />
          <div>
            <h3 className="text-xl font-bold">Travel Experiences</h3>
            <ul className="list-disc pl-6 text-gray-600">
              {profileData.TravelExperiences.map(
                (experience: any, index: number) => (
                  <li key={index}>{experience}</li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <GiTravelDress className="text-2xl mr-4" />
          <div>
            <h3 className="text-xl font-bold">Travel Preferences</h3>
            <ul className="list-disc pl-6 text-gray-600">
              {profileData.TravelPreferences.map(
                (preference: any, index: number) => (
                  <li key={index}>{preference}</li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <FaLocationArrow className="text-2xl mr-4" />
          <div>
            <h3 className="text-xl font-bold">Travelling To</h3>
            <ul className="list-disc pl-6 text-gray-600">
              {profileData.TravellingTo.map((location: any, index: number) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <FaUserTag className="text-2xl mr-4" />
          <div>
            <h3 className="text-xl font-bold">Interests</h3>
            <ul className="list-disc pl-6 text-gray-600">
              {profileData.Interests.map((interest: any, index: number) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
