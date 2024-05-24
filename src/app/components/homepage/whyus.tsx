import React from "react";
import {
  FaUserFriends,
  FaMapMarkerAlt,
  FaSuitcaseRolling,
} from "react-icons/fa";
import Image from "next/image";

const WhyChooseUs = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-8">
      <div className="flex-shrink-0">
        <Image
          src="/images/home/whyus.svg"
          alt="Loading.."
          width={500}
          height={300}
        ></Image>
      </div>
      <div className="mt-8 md:mt-0 md:ml-16 max-w-lg">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
        <p className="mb-6 text-gray-700">
          Enjoy different experiences in every place you visit and discover new
          and affordable adventures of course.
        </p>
        <div className="space-y-4">
          <div className="flex items-center bg-white p-4 rounded shadow">
            <FaUserFriends className="text-blue-500 w-8 h-8" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Find Travel Mates</h3>
              <p className="text-gray-500">
                Connect with fellow travelers to share experiences and
                adventures.
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded shadow">
            <FaMapMarkerAlt className="text-blue-500 w-8 h-8" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Explore Places</h3>
              <p className="text-gray-500">
                Discover and explore the stunning locations throughout Nepal.
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded shadow">
            <FaSuitcaseRolling className="text-blue-500 w-8 h-8" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Book Travel Packages</h3>
              <p className="text-gray-500">
                Easily book comprehensive travel packages for your trips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
