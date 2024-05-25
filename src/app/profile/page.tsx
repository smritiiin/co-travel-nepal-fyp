"use client";
import Image from "next/image";
import { useToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [travellingTo, setTravellingTo] = useState("");
  const [hasProfile, setHasProfile] = useState(false);
  const [profileId, setProfileId] = useState(0);

  const { getUsernameAndRoleFromToken } = useToken();
  const router = useRouter();

  const id = getUsernameAndRoleFromToken("x-access-token").id;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/userprofile/${id}`
        );
        console.log(response);
        setHasProfile(true);
        setProfileId(response.data.ProfileId);
      } catch (error) {
        setHasProfile(false);
      }
    };
    fetchProfileData();
  }, [id]);

  console.log("ProfileID", profileId);

  const updateProfile = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/profile/update/${profileId}`,
        {
          TravellingTo: [travellingTo],
        }
      );
      console.log("Profile update response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div className=" flex flex-col gap-5">
      <div className=" z-0">
        <Image
          src="/images/profile/banner.png"
          alt="Cover Image"
          width={800}
          height={500}
          className="w-[1444px] h-[350px] object-cover "
        ></Image>
      </div>
      <div className="flex justify-center items-center -mt-20 z-10 ">
        <Image
          src="/images/user.svg"
          alt="User"
          width={130}
          height={20}
          className="border-2 border-gray-500 rounded-full"
        ></Image>
      </div>
      <div className="text-center">
        <h2>{getUsernameAndRoleFromToken("x-access-token").username}</h2>
        <h4 className=" text-[#6C6C6C]">
          {getUsernameAndRoleFromToken("x-access-token").role}
        </h4>
        <p className="font-bold"> I love travellinggg yeyyyy!</p>
      </div>

      <div className="flex justify-center mb-10 gap-5">
        {!hasProfile && (
          <Button
            color="primary"
            onClick={() => {
              router.push("/profile/create");
            }}
          >
            Create Profile
          </Button>
        )}
        {hasProfile && (
          <>
            <Button
              color="primary"
              onClick={() => {
                router.push("/profile/create");
              }}
            >
              Edit Profile
            </Button>
            <Button className="border-2 border-[#A5A58D]" onPress={onOpen}>
              Update Travel Status
            </Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Travel Status
                      <p className="font-light">
                        Where are you travelling Next?
                      </p>
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        label="Destination"
                        placeholder="Enter your next destination"
                        type="text"
                        variant="bordered"
                        value={travellingTo}
                        onChange={(e) => setTravellingTo(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={updateProfile}>
                        Update
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
