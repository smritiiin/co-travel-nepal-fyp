import React from "react";
const Destination = () => {
  return (
    <div className="mt-16 absolute border-4 w-full h-screen p-5">
      <div className="flex justify-center items-end">
        <h1 className="text-center">
          Your next{" "}
          <p className=" text-green-700">
            travel <br /> Destination
          </p>{" "}
          is
        </h1>
        <select className="select">
          <option>Bagmati</option>
          <option>Bagmati</option>
          <option>Bagmati</option>
        </select>
      </div>
    </div>
  );
};

export default Destination;
