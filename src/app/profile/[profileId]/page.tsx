"use client";
import { useState, useEffect } from "react";

const ViewProfile = ({ params }: { params: { profileId: string } }) => {
  // <div>Profile {params.profileId}</div>
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data based on the profileId parameter
    // You can replace this code with your actual API or database call
    const fetchProfileData = async () => {
      try {
        // Simulating an API request with a delay
        const response = await fetch(
          `http://localhost:8000/api/profile/${params.profileId}`
        );
        const data = await response.json();
        setProfileData(data);
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
    <div>
      <h1>Profile Page</h1>
      <p>Profile ID: {params.profileId}</p>

      {profileData && (
        <div>
          <h2>Profile Details</h2>
          {/* <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p> */}
          {/* Render other profile details as needed */}
        </div>
      )}
    </div>
  );
};

export default ViewProfile;

// "use client"

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// const ProfilePage = () => {

// const [profileData, setProfileData] = useState(null);
// const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//   // Fetch profile data based on the profileId parameter
//   // You can replace this code with your actual API or database call
//   const fetchProfileData = async () => {
//     try {
//       // Simulating an API request with a delay
//       const response = await fetch(
//         `http://localhost:8000/api/profile/${profileId}`
//       );
//       const data = await response.json();
//       setProfileData(data);
//       setIsLoading(false);
//       console.log(response)
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };

//   fetchProfileData();
// }, [profileId]);

// if (isLoading) {
//   return <p>Loading profile data...</p>;
// }

// return (
//   <div>
//     <h1>Profile Page</h1>
//     <p>Profile ID: {profileId}</p>

//     {profileData && (
//       <div>
//         <h2>Profile Details</h2>
//         {/* <p>Name: {profileData.name}</p>
//         <p>Email: {profileData.email}</p> */}
//         {/* Render other profile details as needed */}
//       </div>
//     )}
//   </div>
// );
// };

// export default ProfilePage;
