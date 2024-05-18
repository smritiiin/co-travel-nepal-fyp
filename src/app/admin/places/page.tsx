"use client";
import {
  Button,
  Divider,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
  TableBody,
  Image,
  Pagination,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import NavAdmin from "../NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import adminAuth from "@/utils/adminAuth";


const Places =() => {
  const router = useRouter();

  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/place/")
      .then((response) => {
        setResponseData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const addPlace = () => {
    router.push("/admin/places/addPlace");
  };

  const handleItemsPerPageChange = (event: any) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
  };

  const totalPages = Math.ceil(responseData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, responseData.length);
  const displayedItems = responseData.slice(startIndex, endIndex);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex">
      <NavAdmin />
      <div className="w-[75%] h-screen py-3">
        <div className="bg-[#F8F8F8] p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Places</h2>
            <Button color="primary" onPress={addPlace}>
              Add Places
            </Button>
          </div>
          <Divider className="mb-2" />
          <Table className="font-thin">
            <TableHeader>
              <TableColumn>.</TableColumn>
              <TableColumn>Place</TableColumn>
              <TableColumn>State</TableColumn>
              <TableColumn>Description</TableColumn>
              <TableColumn>Location</TableColumn>
              <TableColumn>Must See Place</TableColumn>
            </TableHeader>
            <TableBody>
              {displayedItems.map((item) => (
                <TableRow className="mb-2 items-center border" key={item.id}>
                  <TableCell>
                    <Image
                      alt="Card background"
                      className="rounded-xl"
                      src={`http://localhost:8000/${item.Image}`}
                      width={100}
                      height={100}
                      onError={() => console.error("Failed to load image")}
                      key={item.Image}
                    />
                  </TableCell>
                  <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">{item.PlaceName}</h4>
                  </TableCell>
                  <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
                    <small className="text-default-500">{item.StateId}</small>
                  </TableCell>
                  <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
                    <small className="text-default-500">
                      {item.Description}
                    </small>
                  </TableCell>
                  <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
                    <small className="text-default-500">
                      {item.Longitude}, {item.Latitude}
                    </small>
                  </TableCell>
                  <TableCell className="pb-0 pt-2 px-4 flex-col items-start">
                    <small className="text-default-500">
                      Bhaktapur Durbar Square
                    </small>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between mt-3">
            <select
              className="rounded-lg"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
            <Pagination
              total={totalPages}
              initialPage={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default adminAuth(Places);