"use client";
import { Button, Divider, Table } from "@nextui-org/react";
import SearchBar from "../SearchBar";
import { useRouter } from "next/navigation";
import NavAdmin from "../NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import Loading from "@/app/components/Loading";
import { Pagination } from "@nextui-org/react";

export default function Places() {
  const router = useRouter();

  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items to display per page

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/place/")
      .then(function (response) {
        console.log(response.data);
        setResponseData(response.data );
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const addPlace = () => {
    router.push("/admin/places/addPlace");
  };

  // Calculate the range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = responseData.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="h-screen flex">
      <NavAdmin />
      <div className="w-[75%] h-screen py-3">
        <SearchBar />

        <div className="bg-[#F8F8F8] p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Places</h2>
            <Button color="primary" onPress={addPlace}>
              Add Places
            </Button>
          </div>
          <Divider className="mb-2" />
          {/* <div> */}
          <table className="font-thin">
            <tr>
              <th>.</th>
              <th>Place</th>
              <th>State</th>
              <th>Description</th>
              <th>Location</th>
              <th>Must See Place</th>
              <th>.</th>
            </tr>
            {isLoading ? (
              <Loading />
            ) : (
              displayedItems.map((item) => (
                <tr key={item.id} className="mb-2 items-center border">
                  <td>
                    <Image
                      alt="Card background"
                      className="rounded-xl"
                      src={`http://localhost:8000/${item.Image}`}
                      width={100}
                      height={100}
                      // onError={() => console.error("Failed to load image")}
                      key={item.Image}
                    />
                  </td>
                  <td className="pb-0 pt-2 px-4 flex-col items-start">
                    {/* <p className="text-tiny uppercase font-bold">Daily Mix</p> */}
                    <h4 className="font-bold text-large">{item.PlaceName}</h4>
                    {/* <small className="text-default-500">{item.StateId}</small> */}
                  </td>
                  <td className="pb-0 pt-2 px-4 flex-col items-start">
                    {/* <p className="text-tiny uppercase font-bold">Daily Mix</p> */}
                    {/* <h4 className="font-bold text-large">{item.PlaceName}</h4> */}
                    <small className="text-default-500">{item.StateId}</small>
                  </td>

                  <td className="pb-0 pt-2 px-4 flex-col items-start">
                    <small className="text-default-500">
                      {item.Description}
                    </small>
                  </td>
                  <td className="pb-0 pt-2 px-4 flex-col items-start">
                    <small className="text-default-500">
                      {item.Longitude}, {item.Latitude}
                    </small>
                  </td>
                  <td className="pb-0 pt-2 px-4 flex-col items-start">
                    <small className="text-default-500">
                      Bhaktapur Durbar Square
                    </small>
                  </td>
                </tr>
              ))
            )}
          </table>
          {/* </div> */}

          <Pagination
            total={Math.ceil(responseData.length / itemsPerPage)}
            initialPage={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
