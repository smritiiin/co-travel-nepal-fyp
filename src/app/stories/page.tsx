"use client";

import TopContributors from "./TopContributors";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "@/utils/token";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Loading from "../components/Loading";
import { LoginCard } from "../components/LoginCard";

const Stories = () => {
  const { getCookieValue, isTokenAvailableAndNotExpired } = useToken();

  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const latestBlogs = [...responseData];

  // Sort the latest blogs by publishedDate in descending order
  latestBlogs.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blog")
      .then(function (response) {
        console.log(response.data);
        setResponseData(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  const router = useRouter();

  const handleClick = () => {
    const checkTokenValidity = async () => {
      const isTokenValid = isTokenAvailableAndNotExpired("x-access-token");
      console.log("Is Token Valid:", isTokenValid);
      console.log("COOKIE:", getCookieValue);

      if (!isTokenValid) {
        console.log("Please Login...");
        setShowLoginModal(true);
      } else {
        router.push("/stories/addBlog");
      }
    };
    checkTokenValidity();
  };
  
  const handleLoginModalClose = () => {
    router.push("/stories");
    setShowLoginModal(false);
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
        <div className=" flex flex-col justify-center items-center flex-wrap w-[80%]">
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
                        alt="Blog Cover"
                        className="object-cover rounded-xl"
                        src={`http://localhost:8000/${item.imageUrl}`}
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
              {isLoading ? (
                <Loading />
              ) : (
                latestBlogs.map((item) => (
                  <Card key={item.id} className="py-4">
                    <CardBody className="overflow-visible py-2">
                      <Image
                        alt="Blog Cover"
                        className="object-cover rounded-xl"
                        src={`http://localhost:8000/${item.imageUrl}`}
                        width={270}
                        height={200}
                        key={item.imageUrl}
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
          {showLoginModal && (
            <LoginCard isOpen={true} onClose={handleLoginModalClose} />
          )}
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
