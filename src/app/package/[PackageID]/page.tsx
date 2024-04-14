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
} from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useToken } from "@/utils/token";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div key={params.PackageID}>
      <div key={packageData.PackageID}>
        <h2> {packageData.Name}</h2>
        <Image
          src={`http://localhost:8000/${packageData.CoverImage}`}
          alt=""
          height={300}
          width={400}
        ></Image>
        <p>{packageData.Description}</p>
        {packageData.Price}
        {packageData.Duration}
        {packageData.Availability} {packageData.NoOfPerson}{" "}
        {packageData.Accommodation}
        {packageData.Activities} {packageData.Itinerary}
      </div>
      <Button onPress={onOpen} color="primary">
        Book Now!
      </Button>

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
                  <Button type="submit" onClick={handleSubmit(onSubmit)}>
                    Submit
                  </Button>
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
