"use client";
import Loading from "@/app/components/Loading";
import { Card } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { text } from "stream/consumers";

const Place = ({ params }: { params: { PlaceId: string } }) => {
  // const [placeData, setPlaceData] = useState<any[]>([]);
  const [placeData, setPlaceData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  // const [elevation, setElevation] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        // Simulating an API request with a delay
        const response = await axios.get(
          `http://localhost:8000/api/place/place/${params.PlaceId}`
        );
        setPlaceData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchPlaceData();
  }, [params.PlaceId]);

  const lat = placeData.Latitude;
  const lon = placeData.Longitude;

  // console.log("Latitude", lat);
  // console.log("Lognitude", lon);
 useEffect(() => {
   const iframeData = document.getElementById("iframeId") as HTMLIFrameElement;
   if (iframeData) {
     // Perform null check
     iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`;
   }
 });

  useEffect(() => {
    const apiKey = "30a5638e1df4113cadafe7235d04f709";
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(api);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, [lat, lon]);
  const [elevation, setElevation] = useState(null);

  useEffect(() => {
    const fetchElevation = async () => {
      try {
        const response = await axios.get(
          `https://api.open-elevation.com/api/v1/lookup?locations=${lat},${lon}`
        );
        const { data } = response;
        // Extract the elevation value from the response
        const elevationValue = data.results[0].elevation;
        setElevation(elevationValue);
      } catch (error) {
        console.error("Error fetching elevation data:", error);
      }
    };

    fetchElevation();
  }, [lat, lon]);

  return (
    <div key={params.PlaceId}>
      {isLoading ? (
        <Loading />
      ) : (
        <div key={placeData.PlaceId} className=" space-y-5 mt-2">
          <h2>{placeData.PlaceName}</h2>
          <div className=" h-2/4 w-full object-cover">
            <Image
              src={`http://localhost:8000/${placeData.Image}`}
              alt=""
              height={400}
              width={550}
              className="object-cover rounded-lg shadow-md mx-auto"
            ></Image>
          </div>

          <div>
            <h2 style={style.heading}>Description</h2>
            <p className=" text-justify pr-3 py-2">
              {placeData.Description} . The conditional expression checks if the
              stateOptions array has at least one element (stateOptions.length
              0). If it does, the defaultValue is set to the StateId of the
              first element (stateOptions[0].StateId). Otherwise, if the
              stateOptions array is empty, the defaultValue is set to an empty
              string (). This ensures that the default value is only set when
              there is at least one state option available in the stateOptions
              array. Otherwise, no default value will be selected.
            </p>
          </div>
          <div>
            <h2 className="text-right" style={style.heading}>
              Additional Info
            </h2>
            <div className="flex justify-around px-5">
              <iframe
                id="iframeId"
                width={400}
                height="350px"
                className="rounded-lg shadow-md"
              ></iframe>
              <div className="border rounded-md shadow-md bg-slate-50">
                <ul className="grid grid-cols-1 gap-6 p-5 rounded">
                  <li style={style.list}>
                    <Image
                      src="/images/Destinations/health-icon.jpg"
                      alt=""
                      height={40}
                      width={40}
                      className="object-cover rounded-md"
                    ></Image>
                    {placeData.Difficulty}
                  </li>
                  <li style={style.list}>
                    <Image
                      src="/images/Destinations/elevation2.webp"
                      alt="Elevation Gain"
                      height={40}
                      width={40}
                      className="object-cover rounded-md"
                    ></Image>
                    <div> {elevation} meters.</div>
                  </li>
                  <li style={style.list}>
                    <Image
                      src="/images/Destinations/home.png"
                      alt=""
                      height={40}
                      width={40}
                      className="object-cover rounded-md"
                    ></Image>
                    {placeData.Accomodation}
                  </li>
                  <li style={style.list}>
                    <Image
                      src="/images/Destinations/suncloud.jpg"
                      alt=""
                      height={40}
                      width={40}
                      className="object-cover rounded-md"
                    ></Image>
                    Easy
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Card className="max-w-fit ml-10">
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-bold">Weather Forecast</div>
                <div className="text-gray-600">
                  Location:{" "}
                  <span className="text-blue-600">
                    {weatherData?.name}, {weatherData?.sys?.country}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 justify-center items-center">
                {weatherData?.weather && (
                  <div className="flex items-center">
                    <Image
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                      alt="Weather Icon"
                      width={30}
                      height={30}
                      className="mr-4"
                    />
                    <div className="text-xl font-bold">
                      {weatherData.weather[0].description}
                    </div>
                  </div>
                )}
                <h1 className="text-gray-500 w-fit">
                  {Math.round(weatherData?.main?.temp - 273.15)}°C
                </h1>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Humidity: </h2>
                    <div className="text-gray-600">
                      {weatherData?.main?.humidity}%
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-semibold">Wind</div>
                    <div className="text-gray-600">
                      Speed: {weatherData?.wind?.speed} m/s
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <br />
          <br />
          {/* <div>
            <h2 style={style.heading}>Cultural Importance</h2>
            <div></div>
          </div> */}
        </div>
      )}
    </div>
  );
};

const style = {
  heading: {
    fontWeight: "550",
    fontSize: "24px",
    color: "#296B2F",
    textDecoration: "underline",
  },
  list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: " 10px 20px",
    width: "300px",
    color: "#296B2F",
  },
};

export default Place;
