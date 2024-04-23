"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "@/utils/token";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Loading from "../components/Loading";
import { LoginCard } from "../components/LoginCard";
import Image from "next/image";

const Packages = () => {
  const router = useRouter();

  const { isTokenAvailableAndNotExpired } = useToken();

  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/package/")
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

  const cardClick = (PackageID: any) => {
    console.log("Card Clicked");
    console.log("PackageID:", PackageID);
    router.push(`/package/${PackageID}`);
  };

  return (
    <div className="mt-3">
      {/* <div className="min-h-screen">PACKAGES</div> */}
      <div>
        <h2 className=" font-semibold text-3xl underline text-center">
          {" "}
          Our Packages{" "}
        </h2>
        <div className="grid grid-cols-5 gap-4 my-6  ">
          {responseData.map((item) => (
            <Card
              isPressable
              key={item.PackageID}
              onClick={() => cardClick(item.PackageID)}
              className="min-w-fit "
            >
              <CardBody>
                <div className="relative w-[200px] h-[150px] mb-1">
                  <Image
                    alt="Card background"
                    className="rounded-xl object-cover"
                    src={`http://localhost:8000/${item.CoverImage}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex item-center">
                  <Image
                    src="/images/TravelPlan/Location.png"
                    alt=""
                    width={25}
                    height={25}
                  ></Image>
                  <p>Nepal</p>
                </div>
                <h3 className="font-semibold text-[#333333]">{item.Name}</h3>
                <p className="font-[#636363] font-semibold">
                  {item.Duration} <span className=" text-xs">Days</span>/{" "}
                  {item.Duration - 1} <span className=" text-xs">Nights</span>
                </p>
                <p className="text-[#2a2a2a] font-sm ">
                  Total Person: {item.NoOfPerson}{" "}
                </p>

                <p className=" font-semibold text-[#347F90]">
                  {" "}
                  Rs {item.Price}.00
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Packages;
