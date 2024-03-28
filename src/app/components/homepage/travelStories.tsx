import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TravelStories = () => {
  return (
    <div className="px-2 flex flex-col h-screen gap-4">
      <div className="flex justify-between">
        <h2>Travel Blogs</h2>
        <Link href="/stories" className=" text-blue-700 font-semibold">
          Read More
        </Link>
      </div>

      <div className="flex gap-7">
        {/* THis is the top article for this week/ most read this month */}
        <Card className=" p-1">
          <CardBody>
            <Image
              src="/images/Blogs/Bandipur-blog.svg"
              width={450}
              height={350}
              alt=""
            />
            <p className=" w-[450px] truncate overflow-hidden font-semibold">
              Bandipur: authentic village and beautiful hidden gem in Nepal!
            </p>
          </CardBody>
        </Card>

        {/* Other blogs with headline */}
        <div className=" w-1/2">
          <Card className="p-1 ">
            <div className="flex h-full">
              <div className="w-1/2">
                <Image
                  src="/images/Blogs/Bandipur-blog.svg"
                  width={280}
                  height={150}
                  alt=""
                />
              </div>
              <div className=" w-1/2">
                <p className=" font-semibold">
                  Bandipur: authentic village and beautiful hidden gem in Nepal!
                </p>
                <p className=" text-ellipsis overflow-hidden h-full w-full">
                  You will do the Annapurna Circuit trek in Nepal. This is a
                  wonderful hike and a physical challenge. We can recommend
                  everyone to walk this amazing trek in
                  Nepal....................
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-1 ">
            <div className="flex h-full">
              <div className="w-1/2">
                <Image
                  src="/images/Blogs/Bandipur-blog.svg"
                  width={280}
                  height={150}
                  alt=""
                />
              </div>
              <div className=" w-1/2">
                <p className=" font-semibold">
                  Bandipur: authentic village and beautiful hidden gem in Nepal!
                </p>
                <p className=" text-ellipsis overflow-hidden h-full w-full">
                  You will do the Annapurna Circuit trek in Nepal. This is a
                  wonderful hike and a physical challenge. We can recommend
                  everyone to walk this amazing trek in
                  Nepal....................
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TravelStories;
