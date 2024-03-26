"use client";

import TopContributors from "./TopContributors";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Loading from "../components/Loading";

const Stories = () => {
  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blog")
      .then(function (response) {
        console.log(response.data);
        setResponseData(response.data);
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  const router = useRouter();

  const handleClick = () => {
    router.push("/stories/addBlog");
  };
  
  return (
    <div>
      <div className="text-center my-5">
        <h2> From our Travellers</h2>
        <p> Get to know Nepal better from travel enthusiast like you</p>
      </div>

      <div className="flex gap-x-6 w-full">
        <div className=" w-[20%]">
          <TopContributors />
        </div>
        <div className=" flex flex-col justify-center items-center w-[80%] ">
          <div>
            <h2> Popular Blogs</h2>
            <div className="flex gap-5">
              {isLoading ? (
                <Loading />
              ) : (
                responseData.map((item) => (
                  <Card key={item.id} className="py-4">
                    <CardBody className="overflow-visible py-2">
                      <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/images/hero-card-complete.jpeg"
                        width={270}
                        height={200}
                      />
                    </CardBody>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                      {/* <p className="text-tiny uppercase font-bold">Daily Mix</p> */}
                      <h4 className="font-bold text-large">{item.title}</h4>
                      <small className="text-default-500">{item.content}</small>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </div>
          <div>
            <h2> Latest Blogs</h2>
            <div className="flex gap-5">
              {isLoading ? (<Loading/>): ( responseData.map((item) => (
                <Card key={item.id} className="py-4">
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src="/images/hero-card-complete.jpeg"
                      width={270}
                      height={200}
                    />
                  </CardBody>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    {/* <p className="text-tiny uppercase font-bold">Daily Mix</p> */}
                    <h4 className="font-bold text-large">{item.title}</h4>
                    <small className="text-default-500">{item.content}</small>
                  </CardHeader>
                </Card>
              )))}
            </div>
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
