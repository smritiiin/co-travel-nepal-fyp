import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const TravelPlans = () => {
  return (
    <div className=" h-screen p-4 flex flex-col items-center justify-around ">
      <div>
        <h2>Plan Your Vacation!</h2>
        <p>Vacations to make you experience enjoyable in Nepal!</p>
      </div>
      <div className="flex justify-around items-stretch w-full">
        {/* Each card for travel package */}
        <div className=" rounded shadow px-6 py-5">
          <Image
            src="/images/TravelPlan/Lumbini.svg"
            alt="Lumbini"
            width={300}
            height={300}
          />
          <div className="text-lg font-bold">
            <p>Lumbini, Nepal</p>
            <p> 5 Days</p>
          </div>
        </div>

        <div className=" rounded shadow px-6 py-5">
          <Image
            src="/images/TravelPlan/Lumbini.svg"
            alt="Lumbini"
            width={300}
            height={300}
          />
          <div className="text-lg font-bold">
            <p>Lumbini, Nepal</p>
            <p> 5 Days</p>
          </div>
        </div>

        <div className=" rounded shadow px-6 py-5">
          <Image
            src="/images/TravelPlan/Lumbini.svg"
            alt="Lumbini"
            width={300}
            height={300}
          />
          <div className=" text-lg font-bold">
            <p>Lumbini, Nepal</p>
            <p> 5 Days</p>
          </div>
        </div>
      </div>

      <Button color="primary"> See All</Button>
    </div>
  );
};

export default TravelPlans;
