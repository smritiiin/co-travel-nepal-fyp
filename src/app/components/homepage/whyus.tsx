import Image from "next/image";
import React from "react";

const WhyUs = () => {
  return (
    <div className="h-screen py-10 px-16 flex gap-10">
      <Image
        src="/images/home/whyus.svg"
        alt="Loading.."
        width={500}
        height={300}
      ></Image>
      <div>
        <h2>Why Choose Us</h2>
        <p className=" pr-14">
          Enjoy different experiences in every place you visit and discover new
          and affordable adventures of course.
        </p>
      </div>
    </div>
  );
};

export default WhyUs;
