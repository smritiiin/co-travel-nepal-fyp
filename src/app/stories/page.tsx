"use client";

import TopContributors from "./TopContributors";
import { Button, Divider } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "@/utils/token";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Loading from "../components/Loading";
import { LoginCard } from "../components/LoginCard";

const Stories = () => {
  const { isTokenAvailableAndNotExpired } = useToken();

  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAll, setShowAll] = useState(false);

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
    <div className="px-5 md:px-10 lg:px-20">
      <div className="text-center my-5">
        <h2>From our Travellers</h2>
        <p>Get to know Nepal better from travel enthusiasts like you</p>
      </div>
      <Divider />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-1">
          <TopContributors />
        </div>
        <div className="col-span-1 md:col-span-3 flex flex-col">
          <div>
            <h3 className="font-semibold text-lg mt-2">Popular Blogs</h3>
            <div className="flex gap-5 md:grid md:grid-cols-3 md:gap-5">
              {isLoading ? (
                <Loading />
              ) : (
                popularBlogs.slice(1, 4).map((item: any) => (
                  <Card
                    key={item.id}
                    className="w-[280px] h-[350px] flex-shrink-0 md:w-full md:h-auto"
                    onClick={() => cardClick(item.id)}
                    isPressable
                  >
                    <CardBody className="py-1 ">
                      <Image
                        alt="Blog Cover"
                        className="object-cover rounded-xl items-center"
                        src={`http://localhost:8000/${item.imageUrl}`}
                        width={190}
                        height={190}
                      />
                      <CardHeader className="pb-0 pt-2 flex-col items-start">
                        <h4 className="font-bold text-large">{item.title}</h4>
                        <p className="text-default-500 truncate">
                          {item.content.slice(0, 25)}...
                        </p>
                      </CardHeader>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      {item.author.fname} {item.author.lname}
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mt-5">Latest Blogs</h3>
            <div className="flex gap-5 md:grid md:grid-cols-3 md:gap-5">
              {isLoading ? (
                <Loading />
              ) : (
                latestBlogs
                  .slice(0, showAll ? latestBlogs.length : 3)
                  .map((item) => (
                    <Card
                      key={item.id}
                      className="py-4 w-[280px] h-[350px] flex-shrink-0 md:w-full md:h-auto"
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
                          <h4 className="font-bold text-large">{item.title}</h4>
                          <p className="text-default-500 truncate">
                            {item.content.slice(0, 25)}...
                          </p>
                        </CardHeader>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        {item.author.fname} {item.author.lname}
                      </CardFooter>
                    </Card>
                  ))
              )}
            </div>
            <div className="flex justify-center">
              <p
                className="mt-4 px-4 py-2 text-blue-500 cursor-pointer "
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show less" : "Show all"}
              </p>
            </div>
          </div>
          {showLoginModal && (
            <LoginCard isOpen={true} onClose={handleLoginModalClose} />
          )}
          <Button color="primary" className="my-3" onClick={handleClick}>
            <Image
              src="/images/Blogs/addBlog.svg"
              alt=""
              width={20}
              height={20}
            />
            Add Your Blog
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stories;
