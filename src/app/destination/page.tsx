import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
const Destination = () => {
  return (
    <div className="w-full ">
      <div className="flex p-16 h-screen gap-x-6">
        <div className="w-1/2">
          <h1>What makes this country a wonderful place to visit.</h1>
          <p>
            Having stopover in myriad places in Indonesia is what makes this
            country a wonderful place to visit. The beauty of scenic natural
            landscapes blended with various unique culture of its people. Enjoy
            the untouched beaches, mountains, lakes, and many more pleasing
            destinations as well as the magnificent city skylines throughout the
            country. And when you decide to see them all, a visit won’t be
            enough to embrace the wonders of Nepal.
          </p>
        </div>
        <Image
          src="/images/Destinations/Destination.svg"
          width={500}
          height={200}
          alt=""
          className="w-1/2"
        />
      </div>

      <div className="flex justify-center items-end">
        <h1 className="text-center">
          Your next{" "}
          <span className=" text-green-700">
            travel <br /> Destination
          </span>{" "}
          is
        </h1>
        {/* <Select label="Select an animal" className="max-w-xs">
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select> */}
        <select className="select">
          <option>Bagmati</option>
        </select>
      </div>
    </div>
  );
};

export default Destination;
