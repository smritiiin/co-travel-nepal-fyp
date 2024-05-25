"use client";
import { useState, useEffect } from "react";
import { Avatar, Button, Divider, Image } from "@nextui-org/react";
import axios from "axios";

const ViewProfile = ({ params }: { params: { profileId: string } }) => {
  // <div>Profile {params.profileId}</div>
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

  console.log("first", profileData)
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
       <h2>
         {profileData.UserProfile.fname} {profileData.UserProfile.lname}
       </h2>
       <h4 className="text-[#6C6C6C]">{profileData.Nationality}, {profileData.Type}</h4>
       <p className="font-bold">I love travellinggg yeyyyy!</p>
     </div>
   

     <div>
       <h3>Nationality: {profileData.Nationality}</h3>
       <h3>Gender: {profileData.Gender}</h3>
       <h3>Interests:</h3>
       <ul>
         {profileData.Interests.map((interest: any, index: number) => (
           <li key={index}>{interest}</li>
         ))}
       </ul>
       <h3>Languages:</h3>
       <ul>
         {profileData.Languages.map((language: any, index: number) => (
           <li key={index}>{language}</li>
         ))}
       </ul>
       <h3>Travel Experiences:</h3>
       <ul>
         {profileData.TravelExperiences.map(
           (experience: any, index: number) => (
             <li key={index}>{experience}</li>
           )
         )}
       </ul>
       <h3>Travel Preferences:</h3>
       <ul>
         {profileData.TravelPreferences.map(
           (preference: any, index: number) => (
             <li key={index}>{preference}</li>
           )
         )}
       </ul>
       <h3>Travelling To:</h3>
       <ul>
         {profileData.TravellingTo.map((location: any, index: number) => (
           <li key={index}>{location}</li>
         ))}
       </ul>
       <h3>Type: {profileData.Type}</h3>
       <h3>Contact Number: {profileData.ContactNumber}</h3>
       <h3>User ID: {profileData.UserId}</h3>
       <h3>User Profile:</h3>
       <ul>
         <li>ID: {profileData.UserProfile.id}</li>
         <li>Email: {profileData.UserProfile.email}</li>
         <li>First Name: {profileData.UserProfile.fname}</li>
         <li>Last Name: {profileData.UserProfile.lname}</li>
         {/* Add additional properties as needed */}
       </ul>
     </div>
   </div>
 );
};

export default ViewProfile;
