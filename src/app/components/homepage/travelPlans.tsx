import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Package = {
  PackageID: number;
  Name: string;
  Duration: number;
  CoverImage: string;
};

const TravelPlans = () => {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);

  const cardClick = (PackageID: any) => {
    console.log("Card Clicked");
    console.log("PackageID:", PackageID);
    router.push(`/package/${PackageID}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/package")
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="p-4 flex flex-col items-center justify-around">
      <div>
        <h2 className="text-2xl font-bold">Plan Your Vacation!</h2>
        <p className="text-gray-600 mb-3">
          Vacations to make your experience enjoyable in Nepal!
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 items-stretch w-full">
        {/* Iterate through packages and display only the first three */}
        {packages.slice(0, 4).map((pkg) => (
          <Card
          isHoverable
          isPressable
            key={pkg.PackageID}
            className="shadow-lg px-2 py-4 max-w-xs rounded-md"
            onClick={() => cardClick(pkg.PackageID)}
          >
            <CardBody className="p-0 ">
              <Image
                src={`http://localhost:8000/${pkg.CoverImage}`}
                alt={pkg.Name}
                width={400}
                height={200}
                className="object-cover w-full h-full rounded-t-md"
              />
              <CardFooter>
                <div className="text-lg font-bold">
                  <p>{pkg.Name}</p>
                  <p>{pkg.Duration} Days</p>
                </div>
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </div>

      <Button
        color="primary"
        className="mt-6"
        onClick={() => {
          router.push("/package");
        }}
      >
        See All
      </Button>
    </div>
  );
};

export default TravelPlans;
