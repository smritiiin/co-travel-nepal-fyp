import Image from "next/image";
import Link from "next/link";
import React from "react";

const TravelStories = () => {
  return (
    <div className=" px-10 flex flex-col gap-5 overflow-hidden ">
      <div className="flex justify-between">
        <h2>Travel Blogs</h2>
        <Link href="/stories" className=" text-blue-700 font-semibold">
          Read More
        </Link>
      </div>

      <div className="flex">
        {/* THis is the top article for this week/ most read this month */}
        <div className=" w-1/2">
          <Image
            src="/images/Blogs/Bandipur-blog.svg"
            width={350}
            height={350}
            alt=""
          />
          <p className=" truncate">
            Bandipur: authentic village and beautiful hidden gem in Nepal!
          </p>
        </div>

        {/* Other blogs with headline */}
        <div className=" w-1/2">
          <div className="flex">
            <Image
              src="/images/Blogs/Bandipur-blog.svg"
              width={150}
              height={150}
              alt=""
            />
            <div>
              <p className=" truncate">
                Bandipur: authentic village and beautiful hidden gem in Nepal!
              </p>
              <p>
                How cool! You will d0 the Annapurna Circuit trek in Nepal. This
                is a wonderful hike and a physical challenge. We can recommend
                everyone to walk this amazing trek in Nepal....................
              </p>
            </div>
          </div>
          <div className="flex">
            <Image
              src="/images/Blogs/Bandipur-blog.svg"
              width={150}
              height={150}
              alt=""
            />
            <div>
              <p className=" truncate">
                Bandipur: authentic village and beautiful hidden gem in Nepal!
              </p>
              <p>
                How cool! You will d0 the Annapurna Circuit trek in Nepal. This
                is a wonderful hike and a physical challenge. We can recommend
                everyone to walk this amazing trek in Nepal....................
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelStories;
