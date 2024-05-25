"use client";
import { Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import Places from "../admin/places/page";
import { useRouter } from "next/navigation";

interface Place {
  PlaceId: number;
  Description: string;
  Image: string;
  Latitude: string;
  Longitude: string;
  PlaceName: string;
}

const Destination = () => {
  const router = useRouter();

  const [selectedState, setSelectedState] = useState<number>(1);
  const [stateOptions, setStateOptions] = useState([]);
  const [places, setPlaces] = useState<Place[]>([]);

  const handleStateChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // console.log("STateID Before:", stateId);
    const parsedID = parseInt(event.target.value);
    setSelectedState(parsedID);

    try {
      const response = await fetch(
        `http://localhost:8000/api/place/state/${parsedID}`
      );
      const data = await response.json();
      console.log("Places: ", data);
      setPlaces(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  // console.log("PLACES: ", places);

  useEffect(() => {
    const fetchStateOptions = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/place/state");
        const data = await response.json();
        // console.log("RESPONSEIS::",response);

        setStateOptions(data);
        console.log("DATA: ", data);
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    };
    fetchStateOptions();
  }, []);

  const cardClick = (PlaceId: any) => {
    console.log("Card Clicked");
    console.log("PlaceId:", PlaceId);
    router.push(`/destination/${PlaceId}`);
  };

  return (
    <div className="w-full ">
      <div className="flex flex-col md:flex-row p-4 md:p-16 min-h-screen gap-y-6 md:gap-x-6">
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-5xl mb-4 md:leading-snug">
            What makes this country a wonderful place to visit.
          </h1>
          <p>
            Having stopover in myriad places in Nepal is what makes this country
            a wonderful place to visit. The beauty of scenic natural landscapes
            blended with various unique culture of its people. Enjoy the
            untouched beaches, mountains, lakes, and many more pleasing
            destinations as well as the magnificent city skylines throughout the
            country. And when you decide to see them all, a visit won’t be
            enough to embrace the wonders of Nepal.
          </p>
        </div>
        <Image
          src="/images/Destinations/Destination.svg"
          width={500}
          height={200}
          alt=""
          className="w-full md:w-1/2"
        />
      </div>

      <div className="flex justify-center items-end mb-3">
        <h1 className="text-center text-2xl md:text-4xl">
          Your next{" "}
          <span className=" text-green-700 font-bold text-[40px]">
            travel <br /> Destination
          </span>{" "}
          is
        </h1>
        <Select
          size="sm"
          label="Select a state"
          className="max-w-xs"
          onChange={handleStateChange}
          key=""
        >
          {stateOptions.map((state: any) => (
            <SelectItem
              key={state.StateId}
              value={state.StateId}
              className=" text-gray-700"
            >
              {state.StateName}
            </SelectItem>
          ))}
        </Select>
      </div>

      {places.length <= 0 ? (
        <p className="text-center py-2"> Please select a state</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {places.length > 0 &&
            places.map((place) => (
              <Card key={place.PlaceId} className="p-3 mb-5 ">
                <Image
                  src={`http://localhost:8000/${place.Image}`}
                  alt={place.PlaceName}
                  className="  object-cover rounded-md"
                  width={250}
                  height={200}
                  onClick={() => cardClick(place.PlaceId)}
                  // loader={({ src }) => `http://localhost:8000/${src}`}
                />
                <h3 className="font-bold">{place.PlaceName}</h3>
                <p className=" text-gray-600 text-sm truncate">
                  {place.Description}
                </p>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default Destination;
