"use client";
import Loading from "@/app/components/Loading";
import { Card } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

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
    const iframeData = document.getElementById("iframeId");
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
        <div key={placeData.PlaceId}>
          <h2>{placeData.PlaceName}</h2>
          <Image
            src={`http://localhost:8000/${placeData.Image}`}
            alt=""
            height={200}
            width={400}
            className=" object-cover"
          ></Image>

          <div>
            <h2 style={style.heading}>Description</h2>
            <p>
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
            <div className="flex">
              <iframe id="iframeId" width={400} height="350px"></iframe>
              <div>
                <ul>
                  <li className="flex gap-4">
                    <Image
                      src={`http://localhost:8000/${placeData.Image}`}
                      alt=""
                      height={40}
                      width={40}
                      className="object-cover rounded-md"
                    ></Image>
                    Easy
                  </li>
                  <li className="flex gap-4">
                    <Image
                      src="/images/Destinations/elevation2.webp"
                      alt="Elevation Gain"
                      height={40}
                      width={40}
                      className="object-cover rounded-md"
                    ></Image>
                    <div>Elevation: {elevation} meters</div>
                  </li>
                  <li className="flex gap-4">
                    <Image
                      src="/images/Destinations/health-icon.jpg"
                      alt=""
                      height={40}
                      width={40}
                      className="object-cover rounded-md"
                    ></Image>
                    Easy
                  </li>
                  <li className="flex gap-4">
                    <Image
                      src={`http://localhost:8000/${placeData.Image}`}
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

          <Card className="max-w-fit">
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
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                      alt="Weather Icon"
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
          <div>
            <h2 style={style.heading}>Cultural Importance</h2>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

const style = {
  heading: {
    fontWeight: "600",
    color: "#296B2F",
    textDecoration: "underline",
  },
};

export default Place;
