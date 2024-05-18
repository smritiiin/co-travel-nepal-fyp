"use client";
import {
  Input,
  Textarea,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import axios from "axios";

import { useState } from "react";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  Name: string;
  Price: number;
  Duration: string;
  NoOfPerson: number;
  Description: string;
  Accommodation: string;
  Activities: string;
  Itinerary: string;
  CoverImage: File;
};

const AddPackage = () => {
  const schema: ZodType<FormData> = z.object({
    Name: z.string(),
    Price: z.number().min(1),
    Duration: z.string(),
    NoOfPerson: z.number().int().positive(),
    Description: z.string(),
    Accommodation: z.string(),
    Activities: z.string(),
    Itinerary: z.string(),
    CoverImage: z.instanceof(File, { message: "Image is required" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [packageData, setPackageData] = useState({
    Name: "",
    Price: 0,
    Duration: "",
    NoOfPerson: 0,
    Description: "",
    Accommodation: "",
    Activities: "",
    Itinerary: "",
    CoverImage: null,
  });

  // const[errors, setErrors] = useState({});

  const handleInputChange = (e: any) => {
    if (e.target.name === "CoverImage") {
      const file = e.target.files[0];
      setPackageData({ ...packageData, [e.target.name]: file });
    } else {
      setPackageData({ ...packageData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e: FormData) => {
    // e.preventDefault();
    console.log("Submit Clicked");

    try {
      const formData = new FormData();
      formData.append("Name", packageData.Name);
      formData.append("Price", packageData.Price.toString());
      formData.append("Duration", packageData.Duration);
      formData.append("NoOfPerson", packageData.NoOfPerson.toString());
      formData.append("Description", packageData.Description);
      formData.append("Accommodation", packageData.Accommodation);
      formData.append("Activities", packageData.Activities);
      formData.append("Itinerary", packageData.Itinerary);

      if (packageData.CoverImage) {
        formData.append("CoverImage", packageData.CoverImage);
      }

      const response = await axios.post(
        "http://localhost:8000/api/package/add",
        formData
      );

      if (response) {
        alert(JSON.stringify(response.data));
        console.log("Response:", response.data);
      } else {
        console.log("RESPONSE:", response);
      }
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <div>
      <h2 className="text-center">Add Package</h2>
      <form
        className="flex flex-col gap-2"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card>
          <CardBody className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Input
                type="text"
                label="Package Name"
                name="Name"
                onChange={handleInputChange}
                // {...register("Name")}
              ></Input>
              {/* {errors.Name && (
                  <span className="font-bold text-xl from-red-900">
                    {errors.Name.message} Helloo
                  </span>
                )} */}
            </div>
            <Input
              type="number"
              label="Price"
              name="Price"
              onChange={handleInputChange}
            ></Input>
            <Input
              type="text"
              label="Duration"
              name="Duration"
              onChange={handleInputChange}
            ></Input>
            <Input
              type="number"
              label="No of Person"
              name="NoOfPerson"
              onChange={handleInputChange}
            ></Input>
            <Textarea
              label="Description"
              placeholder="Enter your description"
              name="Description"
              onChange={handleInputChange}
            ></Textarea>
            <Textarea
              label="Accommodation"
              placeholder="Accommodation details"
              name="Accommodation"
              onChange={handleInputChange}
            ></Textarea>
            <Textarea
              label="Activities"
              placeholder="Popular Activities"
              name="Activities"
              onChange={handleInputChange}
            ></Textarea>
            <Textarea
              label="Itinerary"
              placeholder=" Day-1: ..."
              name="Itinerary"
              onChange={handleInputChange}
            ></Textarea>
            <Input
              type="file"
              name="CoverImage"
              onChange={handleInputChange}
            ></Input>
          </CardBody>
          <CardFooter className="flex justify-center">
            <Button color="primary" type="submit">
              Add Package
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
export default agentAuth(AddPackage);
