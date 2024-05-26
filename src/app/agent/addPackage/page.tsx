"use client";

import { useState } from "react";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import agentAuth from "@/utils/agentAuth";
import NavAgent from "../NavAgent";
import { useRouter } from "next/navigation";

type FormData = {
  Name: string;
  Price: number;
  Duration: string;
  NoOfPerson: number;
  Description: string;
  Accommodation: string;
  Activities: string;
  Itinerary: string;
  CoverImage: FileList;
};

const AddPackage = () => {
  const router = useRouter();

  const schema: ZodType<FormData> = z.object({
    Name: z.string(),
    Price: z.number().min(1),
    Duration: z.string(),
    NoOfPerson: z.number().int().positive(),
    Description: z.string(),
    Accommodation: z.string(),
    Activities: z.string(),
    Itinerary: z.string(),
    CoverImage: z.instanceof(FileList, { message: "Image is required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("Name", data.Name);
      formData.append("Price", data.Price.toString());
      formData.append("Duration", data.Duration);
      formData.append("NoOfPerson", data.NoOfPerson.toString());
      formData.append("Description", data.Description);
      formData.append("Accommodation", data.Accommodation);
      formData.append("Activities", data.Activities);
      formData.append("Itinerary", data.Itinerary);

      if (data.CoverImage.length > 0) {
        formData.append("CoverImage", data.CoverImage[0]);
      }

      const response = await fetch("http://localhost:8000/api/package/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Package added successfully!");
        window.setTimeout(() => {
          setMessage("");
          router.push("/agent");
        }, 1000);
      } else {
        const errorResponse = await response.json();
        setMessage(`Error: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error adding package:", error);
      setMessage("Error adding package. Please try again.");
    }
  };

  return (
    <div className="flex gap-4">
      <NavAgent />
      <div>
        <h2 className="text-center mb-4">Add Package</h2>
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label htmlFor="Name" className="mb-1">
                Package Name
              </label>
              <input
                type="text"
                id="Name"
                {...register("Name")}
                className="border border-gray-300 p-2 rounded"
              />
              {errors.Name && (
                <p className="text-red-500 mt-1">{errors.Name.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="Price" className="mb-1">
                Price
              </label>
              <input
                type="number"
                id="Price"
                {...register("Price", { valueAsNumber: true })}
                className="border border-gray-300 p-2 rounded"
              />
              {errors.Price && (
                <p className="text-red-500 mt-1">{errors.Price.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="Duration" className="mb-1">
                Duration
              </label>
              <input
                type="text"
                id="Duration"
                {...register("Duration")}
                className="border border-gray-300 p-2 rounded"
              />
              {errors.Duration && (
                <p className="text-red-500 mt-1">{errors.Duration.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="NoOfPerson" className="mb-1">
                No of Person
              </label>
              <input
                type="number"
                id="NoOfPerson"
                {...register("NoOfPerson", { valueAsNumber: true })}
                className="border border-gray-300 p-2 rounded"
              />
              {errors.NoOfPerson && (
                <p className="text-red-500 mt-1">{errors.NoOfPerson.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="Description" className="mb-1">
                Description
              </label>
              <textarea
                id="Description"
                {...register("Description")}
                className="border border-gray-300 p-2 rounded"
              ></textarea>
              {errors.Description && (
                <p className="text-red-500 mt-1">
                  {errors.Description.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="Accommodation" className="mb-1">
                Accommodation
              </label>
              <textarea
                id="Accommodation"
                {...register("Accommodation")}
                className="border border-gray-300 p-2 rounded"
              ></textarea>
              {errors.Accommodation && (
                <p className="text-red-500 mt-1">
                  {errors.Accommodation.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="Activities" className="mb-1">
                Activities
              </label>
              <textarea
                id="Activities"
                {...register("Activities")}
                className="border border-gray-300 p-2 rounded"
              ></textarea>
              {errors.Activities && (
                <p className="text-red-500 mt-1">{errors.Activities.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="Itinerary" className="mb-1">
                Itinerary
              </label>
              <textarea
                id="Itinerary"
                {...register("Itinerary")}
                className="border border-gray-300 p-2 rounded"
              ></textarea>
              {errors.Itinerary && (
                <p className="text-red-500 mt-1">{errors.Itinerary.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="CoverImage" className="mb-1">
                Cover Image
              </label>
              <input
                type="file"
                id="CoverImage"
                {...register("CoverImage")}
                className="border border-gray-300 p-2 rounded"
              />
              {errors.CoverImage && (
                <p className="text-red-500 mt-1">{errors.CoverImage.message}</p>
              )}
            </div>
          </div>
          {message && <p className="text-red-500 mt-4">{message}</p>}

          <button className=" bg-blue-500 p-2 rounded-lg">Add Package</button>
        </form>
      </div>
    </div>
  );
};
export default agentAuth(AddPackage);
