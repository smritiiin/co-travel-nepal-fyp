
"use client";

import TopContributors from "./TopContributors";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Stories = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/stories/addBlog");
  };
  return (
    <div>
      <div className="text-center">
        <h2> From our Travellers</h2>
        <p> Get to know Nepal better from travel enthusiast like you</p>
      </div>

      <div className="flex gap-x-6 w-full">
        <TopContributors />
        <div className=" flex flex-col justify-center items-center">
          <div>
            <h2> Popular Blogs</h2>
            CARD GOES HERE
          </div>
          <div>
            <h2> Latest Blogs</h2>
            CARD GOES HERE
          </div>

          <Button color="primary" onClick={handleClick}>
            {" "}
            <Image
              src="/images/Blogs/addBlog.svg"
              alt=""
              width={20}
              height={20}
            ></Image>
            Add Your Blog
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stories;
