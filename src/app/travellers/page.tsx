"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../admin/SearchBar";
import Image from "next/image";
import { useToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { Card, CardBody, Divider } from "@nextui-org/react";
import axios from "axios";
import Loading from "../components/Loading";
import { LoginCard } from "../components/LoginCard";

const Travellers = () => {
  const router = useRouter();
  const { isTokenAvailableAndNotExpired, getUsernameAndRoleFromToken } =
    useToken();

  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const checkTokenValidity = async () => {
      const isTokenValid = isTokenAvailableAndNotExpired("x-access-token");
      console.log("Is Token Valid:", isTokenValid);

      if (!isTokenValid) {
        console.log("Please Login...");
        setShowLoginModal(true);
        setIsLoading(false);
      } else {
        try {
          const response = await axios.get("http://localhost:8000/api/profile");

          const tokenUserId = getUsernameAndRoleFromToken("x-access-token").id;

          const updatedResponse = response.data.filter(
            (item: any) => item.UserId !== tokenUserId
          );
          setResponseData(updatedResponse);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }
    };
    checkTokenValidity();
  }, []);

  const handleChat = () => {
    router.push("travellers/chat");
  };

  const handleLoginModalClose = () => {
    router.push("/");
  };

  const cardClick = (profileId: any) => {
    console.log("Card Clicked");
    console.log("ProfileID:", profileId);
    router.push(`/profile/${profileId}`);
  };

  const openConversation = async (profileId: any) => {
    console.log("Open Conversation");
    console.log("PROFILEIDDDD:", profileId);

    try {
      console.log("senderid", getUsernameAndRoleFromToken("x-access-token").id);
      console.log("receiverid:", profileId);
      const response = await axios.post(
        "http://localhost:8000/api/conversation/new",
        {
          senderId: getUsernameAndRoleFromToken("x-access-token").id,
          receiverId: profileId,
        }
      );
      console.log("CLICKED RESPONSE: ", response);
      router.push("/travellers/chat");
    } catch (error) {
      router.push("/travellers/chat");
      console.error(error);

    }
  };

  return (
    <div className="rounded-2xl m-4 drop-shadow-md p-5">
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
          <h2 className="text-xl md:text-2xl">Find Friends</h2>
          <SearchBar
            onChange={(event: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setSearchTerm(event.target.value);
            }}
          />
          <Image
            src="/images/Travellers/chat.png"
            alt="Chat"
            className="cursor-pointer"
            width={70}
            height={20}
            onClick={handleChat}
          ></Image>
        </div>
        <div>
          {showLoginModal && (
            <LoginCard isOpen={true} onClose={handleLoginModalClose} />
          )}
          {isLoading ? (
            <Loading />
          ) : (
            responseData
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.UserProfile.fname &&
                  val.UserProfile.fname
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return val;
                } else if (
                  val.TravellingTo &&
                  Array.isArray(val.TravellingTo) &&
                  val.TravellingTo.some((destination: any) =>
                    destination.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                ) {
                  return val;
                }
              })
              .map((item) => (
                <Card
                  isHoverable
                  key={item.id}
                  className="border-none bg-background/60 dark:bg-default-100/50 mx-auto my-3 w-full max-w-md md:max-w-lg lg:max-w-xl"
                  shadow="sm"
                >
                  <CardBody>
                    <div className="flex items-center justify-between flex-col md:flex-row">
                      <div className="flex gap-3 items-center">
                        <Image
                          alt="User"
                          className="object-cover"
                          height={80}
                          src="/images/user.svg"
                          width={80}
                          onClick={() => cardClick(item.ProfileId)}
                        ></Image>
                        <div
                          className="flex flex-col"
                          onClick={() => cardClick(item.ProfileId)}
                        >
                          <h3 className="font-bold text-foreground/90">
                            {item.UserProfile.fname} {item.UserProfile.lname}
                          </h3>
                          <p className="text-xs text-foreground/80 mb-1">
                            {item.Nationality}
                          </p>
                          <p className="text-gray-600 text-sm">
                            <span className="font-semibold">Interests:</span>{" "}
                            {item.Interests.join(", ")}
                          </p>
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 h-4 my-2">
                            <Image
                              alt="Map"
                              width={25}
                              height={15}
                              src="/images/travellers/travellingTo.png"
                            ></Image>
                            <p className="text-gray-600 text-sm">
                              {item.TravellingTo.join(", ")}
                            </p>
                            <Divider orientation="vertical" />
                            <p className="text-small text-foreground/80">
                              {item.Type}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Image
                          src="/images/travellers/chat.png"
                          alt="Chat"
                          height={40}
                          width={40}
                          className="cursor-pointer"
                          onClick={() => openConversation(item.ProfileId)}
                        ></Image>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Travellers;
