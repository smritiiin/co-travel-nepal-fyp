"use client";

import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  useDisclosure,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import agentAuth from "@/utils/agentAuth";
import NavAgent from "../NavAgent";

type Package = {
  PackageId: number;
  Name: string;
  Price: number;
  Duration: string;
  NoOfPerson: number;
  Description: string;
  Accommodation: string;
  Activities: string;
  Itinerary: string;
  CoverImage: string; // Assuming it's a URL or base64 string
};

const PackagesList = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/package/");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      console.log("ID TO delete is:", id);
      await axios.delete(`http://localhost:8000/api/package/delete/${id}`);
    //   setPackages(packages.filter((pkg) => pkg.PackageId !== id));
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const handleEdit = async (id: number) => {
    if (!selectedPackage) return;
    console.log("Package to Update:", selectedPackage.PackageId);

    try {
      await axios.patch(
        `http://localhost:8000/api/package/update/${id}`,
        selectedPackage
      );
      setPackages(
        packages.map((pkg) =>
          pkg.PackageId === selectedPackage.PackageId ? selectedPackage : pkg
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (selectedPackage) {
      setSelectedPackage({
        ...selectedPackage,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="flex gap-4 h-screen">
      <NavAgent />
      <div>
        <h2 className="text-center mb-4">Travel Packages</h2>
        <Table>
          <TableHeader>
            <TableColumn>Package Name</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Duration</TableColumn>
            <TableColumn>No. of Person</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.PackageId}>
                <TableCell>{pkg.Name}</TableCell>
                <TableCell>{pkg.Price}</TableCell>
                <TableCell>{pkg.Duration}</TableCell>
                <TableCell>{pkg.NoOfPerson}</TableCell>
                <TableCell>
                  <Button
                    startContent={<FaEdit />}
                    onPress={() => {
                      setSelectedPackage(pkg);
                      setEditModalOpen(true);
                    }}
                  />
                  <Button
                    startContent={<FaTrash />}
                    color="danger"
                    onPress={() => handleDelete(pkg.PackageId)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedPackage && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
          >
            <ModalHeader>
              <h3>Edit Package</h3>
            </ModalHeader>
            <ModalBody>
              <Input
                label="Package Name"
                name="Name"
                value={selectedPackage.Name}
                onChange={handleInputChange}
              />
              <Input
                label="Price"
                type="number"
                name="Price"
                value={selectedPackage.Price}
                onChange={handleInputChange}
              />
              <Input
                label="Duration"
                name="Duration"
                value={selectedPackage.Duration}
                onChange={handleInputChange}
              />
              <Input
                label="No of Person"
                type="number"
                name="NoOfPerson"
                value={selectedPackage.NoOfPerson}
                onChange={handleInputChange}
              />
              <Input
                label="Description"
                name="Description"
                value={selectedPackage.Description}
                onChange={handleInputChange}
              />
              <Input
                label="Accommodation"
                name="Accommodation"
                value={selectedPackage.Accommodation}
                onChange={handleInputChange}
              />
              <Input
                label="Activities"
                name="Activities"
                value={selectedPackage.Activities}
                onChange={handleInputChange}
              />
              <Input
                label="Itinerary"
                name="Itinerary"
                value={selectedPackage.Itinerary}
                onChange={handleInputChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleEdit(selectedPackage.PackageId);
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default agentAuth(PackagesList);
