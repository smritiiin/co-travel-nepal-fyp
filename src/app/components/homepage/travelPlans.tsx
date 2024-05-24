import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Package = {
  PackageID: number;
  Name: string;
  Duration: number;
  CoverImage: string;
};

const TravelPlans = () => {
  const [packages, setPackages] = useState<Package[]>([]);

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
      <div className="flex justify-around items-stretch w-full">
        {/* Iterate through packages and display only the first three */}
        {packages.slice(0, 4).map((pkg) => (
          <Card
            key={pkg.PackageID}
            className="shadow-lg px-6 py-5 max-w-xs rounded-md"
          >
            <CardBody className="p-0">
              <Image
                src={`http://localhost:8000/${pkg.CoverImage}`}
                alt={pkg.Name}
                width={300}
                height={200}
                className="object-cover rounded-t-md"
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

      <Button color="primary" className="mt-6">
        See All
      </Button>
    </div>
  );
};

export default TravelPlans;
