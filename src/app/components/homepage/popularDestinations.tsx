import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";

// Define the interface for the place data structure
interface Place {
  PlaceId: number;
  PlaceName: string;
  Description: string;
  Image: string;
}

const PopularDestinations = () => {
  // Use the interface to type the state variable
  const [place, setPlace] = useState<Place[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/place")
      .then(function (response) {
        console.log(response.data);
        setPlace(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const placesToDisplay = place.slice(0, 4);

  const router = useRouter();

  const cardClick = (PlaceId: any) => {
    console.log("Card Clicked");
    console.log("PlaceId:", PlaceId);
    router.push(`/destination/${PlaceId}`);
  };

  return (
    <div className="px-4 md:px-10 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-left text-2xl md:text-3xl font-bold">
            Popular Destinations
          </h2>
          <p className="text-sm md:text-base">
            Vacations to make your experience enjoyable in Nepal!
          </p>
        </div>
        <div className="text-blue-600 font-semibold text-sm mt-2 md:mt-0">
          View All
        </div>
      </div>

      {/* CARD COMPONENT FOR POPULAR DESTINATIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {placesToDisplay.length > 0 ? (
          placesToDisplay.map((item) => (
            <Card
              key={item.PlaceId}
              className="p-3 mb-5 mt-3"
              isHoverable
              isPressable
              onClick={() => cardClick(item.PlaceId)}
            >
              <Image
                src={`http://localhost:8000/${item.Image}`}
                alt={item.PlaceName}
                className="object-cover rounded-md"
                width={250}
                height={200}
              />
              <h3 className="font-bold mt-2">{item.PlaceName}</h3>
              <p className="text-gray-600 text-sm truncate">
                {item.Description}
              </p>
            </Card>
          ))
        ) : (
          <p>No popular destinations available.</p>
        )}
      </div>
    </div>
  );
};

export default PopularDestinations;
