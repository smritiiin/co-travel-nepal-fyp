import Image from "next/image";
import React from "react";

const TravelPlans = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="">Travel Plans</h1>
        <p>See all</p>
      </div>
      <div className="flex justify-around mt-8">
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
    </div>
  );
};

export default TravelPlans;
