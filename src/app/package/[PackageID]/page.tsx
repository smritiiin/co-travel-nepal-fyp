"use client";
import Loading from "@/app/components/Loading";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Card,
  CardBody,
} from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useToken } from "@/utils/token";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

type FormData = {
  noOfPerson: number;
  startDate: Date;
  endDate: Date;
};
const schema: ZodType<FormData> = z
  .object({
    noOfPerson: z.coerce.number(),
    startDate: z.coerce.date().refine((data) => data > new Date(), {
      message: "Start date must be in the future",
    }),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  });

const Package = ({ params }: { params: { PackageID: string } }) => {
  const router = useRouter();
  const { getUsernameAndRoleFromToken } = useToken();

  const [packageData, setPackageData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        // Simulating an API request with a delay
        const response = await axios.get(
          `http://localhost:8000/api/package/package/${params.PackageID}`
        );
        setPackageData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching package :", error);
      }
    };

    fetchPackageData();
  }, [params.PackageID]);

  const onSubmit = async (data: FormData) => {
    console.log("button clicked haii ta!");
    try {
      const bookingData = {
        PackageId: parseInt(params.PackageID),
        UserId: getUsernameAndRoleFromToken("x-access-token").id,
        NoOfPerson: data.noOfPerson,
        StartDate:
          data.startDate.toISOString().split("T")[0] + "T00:00:00.000Z",
        EndDate: data.endDate.toISOString().split("T")[0] + "T00:00:00.000Z",
      };
      console.log("BOOKING DATA:", bookingData);
      const response = await axios.post(
        "http://localhost:8000/api/package/booking/add",
        bookingData
      );
      console.log(response.data);
      // router.push("/profile/[profileId]");
    } catch (error) {
      console.log(error);
    }
  };

  const payment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/package/payment"
      );

      console.log(response.data);
      router.push(response.data.payment_url);
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div key={params.PackageID}>
      <div key={packageData.PackageID}>
        {/* <h2 className="text-center"> {packageData.Name}</h2> */}
        <div
          className="flex  bg-current min-h-full w-full justify-end rounded-xl"
          style={{
            backgroundImage: "url('/images/travelPlan/travelPackageCover.jpg')",
          }}
        >
          <div className="p-4 text-4xl font-semibold text-[#3c3744] rounded-lg font-serif animate-typing ">
            <p>
              Explore the Wonders of Nepal <br />
              With
              <span className="text-[#1b4b23] text-5xl"> Lumbini Holidays</span>
            </p>
          </div>
          <div className="p-10 text-2xl font-semibold bg-[#cdc1b5] rounded-lg mt-40 mb-10 mx-10 text-white shadow-inner border">
            <p>{packageData.Duration - 1} Nights</p>
            <p>{packageData.Duration} Days</p>
          </div>
        </div>

        <Card className="grid grid-cols-2 mx-10 px-10 mt-5 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <Image
              src={`http://localhost:8000/${packageData.CoverImage}`}
              alt=""
              width={350}
              height={306}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-lg mb-4">{packageData.Name}</h2>
              <div className="text-gray-600 mb-2">
                <p>
                  <span className="font-bold">Description:</span>{" "}
                  {packageData.Description}
                </p>
                <p>
                  <span className="font-bold">Number of People:</span>{" "}
                  {packageData.NoOfPerson}
                </p>
                <p>
                  <span className="font-bold">Accommodation:</span>{" "}
                  {packageData.Accommodation}
                </p>
                <p>
                  <span className="font-bold">Activities:</span>{" "}
                  {packageData.Activities}
                </p>
                <p>
                  <span className="font-bold">Travel Itinerary:</span>{" "}
                  {packageData.Itinerary}
                </p>
              </div>
            </div>
            <p className="font-semibold mt-3">
              Price:{" "}
              <span className="font-bold text-green-600">
                Rs. {packageData.Price}
              </span>
            </p>
          </div>
        </Card>

        <div className="w-full justify-center py-4 items-center flex">
          <Button onPress={onOpen} color="primary" className="mt-5 mx-auto">
            Book Now!
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Booking- {packageData.Name}
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    type="number"
                    placeholder="Number of Person"
                    {...register("noOfPerson")}
                  ></Input>
                  {errors.noOfPerson && (
                    <div className="text-red-600">
                      {errors.noOfPerson.message}
                    </div>
                  )}
                  <Input
                    label="Start Date"
                    placeholder=" "
                    type="date"
                    {...register("startDate", { required: true })}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.startDate && (
                    <div className="text-red-600">
                      {errors.startDate.message}
                    </div>
                  )}

                  <Input
                    label="End Date"
                    placeholder=" "
                    type="date"
                    {...register("endDate", { required: true })}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.endDate && (
                    <div className="text-red-600">{errors.endDate.message}</div>
                  )}

                  <ModalFooter>
                    {/* <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button> */}
                    {/* <Button color="primary" type="submit" >
                      Book
                    </Button> */}
                  </ModalFooter>
                  <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    color="primary"
                  >
                    Submit
                  </Button>

                  {/* <Button onClick={payment}>Pay Garam Ta</Button> */}
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Package;
