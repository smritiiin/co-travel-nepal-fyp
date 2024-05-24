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
    <div className="px-10 mt-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-left text-3xl font-bold">Popular Destinations</h2>
          <p>Vacations to make your experience enjoyable in Nepal!</p>
        </div>
        <div className="text-blue-600 font-semibold text-sm">View All</div>
      </div>

      {/* CARD COMPONENT FOR POPULAR DESTINATIONS */}
      <div className="grid grid-cols-4 gap-4">
        {placesToDisplay.length > 0 ? (
          placesToDisplay.map((item) => (
            <Card key={item.PlaceId} className="p-3 mb-5 mt-3" isHoverable isPressable>
              <Image
                src={`http://localhost:8000/${item.Image}`}
                alt={item.PlaceName}
                className="object-cover rounded-md"
                width={250}
                height={200}
                onClick={() => cardClick(item.PlaceId)}
              />
              <h3 className="font-bold">{item.PlaceName}</h3>
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
