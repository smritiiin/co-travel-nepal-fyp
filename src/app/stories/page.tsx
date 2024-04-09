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
  
  const { isTokenAvailableAndNotExpired } = useToken();

  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const latestBlogs = [...responseData];

  // Sort the latest blogs by publishedDate in descending order
  latestBlogs.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const popularBlogs = shuffleArray([...responseData]);

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
  const cardClick = (id: any) => {
    console.log("Card Clicked");
    console.log("BlogId:", id);
    router.push(`/stories/${id}`);
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
                popularBlogs.map((item: any) => (
                  <Card
                    key={item.id}
                    className="py-4 w-[280px] h-[370px]"
                    onClick={() => cardClick(item.id)}
                    isPressable
                  >
                    <CardBody className="py-2 overflow-hidden">
                      <Image
                        alt="Blog Cover"
                        className="object-cover rounded-xl"
                        src={`http://localhost:8000/${item.imageUrl}`}
                        width={270}
                        height={200}
                      />
                      <CardHeader className="pb-0 pt-2 flex-col items-start">
                        <h4 className="font-bold text-large truncate...">
                          {item.title}
                        </h4>
                        <p className="text-default-500  truncate...">
                          {item.content}
                        </p>
                      </CardHeader>
                    </CardBody>
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
                  <Card
                    key={item.id}
                    className="py-4 w-[280px] h-[370px]"
                    onClick={() => cardClick(item.id)}
                    isPressable
                  >
                    <CardBody className="py-2 overflow-hidden">
                      <Image
                        alt="Blog Cover"
                        className="object-cover rounded-xl"
                        src={`http://localhost:8000/${item.imageUrl}`}
                        width={270}
                        height={200}
                      />
                      <CardHeader className="pb-0 pt-2 flex-col items-start">
                        <h4 className="font-bold text-large truncate...">
                          {item.title}
                        </h4>
                        <p className="text-default-500  truncate...">
                          {item.content}
                        </p>
                      </CardHeader>
                    </CardBody>
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
