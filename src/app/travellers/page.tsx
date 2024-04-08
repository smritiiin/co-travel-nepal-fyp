"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../admin/SearchBar";
import Image from "next/image";
import { useToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@nextui-org/react";
import axios from "axios";
import Loading from "../components/Loading";
import { LoginCard } from "../components/LoginCard";

const Travellers = ({ conversationId, profileId }) => {
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
          console.log(response.data);
          setResponseData(response.data);
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
    // setShowLoginModal(false);
  };

  const cardClick = (profileId: any) => {
    console.log("Card Clicked");
    console.log("ProfileID:", profileId);
    router.push(`/profile/${profileId}`);
  };

  const openConversation = async ( profileId: any) => {
    console.log("Open Conversation");
    // const senderId = getUsernameAndRoleFromToken("x-access-token").id;
  console.log("PROFILEIDDDD:",profileId) ;

    try {
      console.log("senderid", getUsernameAndRoleFromToken("x-access-token").id);
      console.log("receiverid:", profileId)
      const response = await axios.post(
        "http://localhost:8000/api/conversation/new",
        {
          senderId: getUsernameAndRoleFromToken("x-access-token").id,
          receiverId: profileId,
        }
      );
      console.log("CLICKED RESPONSE: ",response);
    router.push("/travellers/chat");

    } catch (error) {
      // Handle the successful conversation creation, e.g., navigate to the conversation page

      console.error(error);
      // Handle any errors that occur during conversation creation
    }
  };

  return (
    <div className="rounded-2xl m-4 drop-shadow-md p-5">
      <div className="flex flex-col w-full">
        <div className="flex justify-around items-center mb-5">
          <h1> Find Friends</h1>
          <SearchBar
            onChange={(event: {
              target: { value: React.SetStateAction<string> };
            }) => {
              setSearchTerm(event.target.value);
            }}
          />
          <Image
            src="/images/Travellers/Chat.svg"
            alt="Chat"
            width={90}
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
                  // isPressable
                  isHoverable
                  key={item.id}
                  className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mx-auto my-3"
                  shadow="sm"
                >
                  <CardBody>
                    <div className="flex items-center justify-around">
                      <Image
                        alt="User"
                        className=" object-cover"
                        height={80}
                        src="/images/user.svg"
                        width={80}
                        onClick={() => cardClick(item.ProfileId)}
                      />
                      <div
                        className="flex flex-col col-span-6 md:col-span-8 pl-4"
                        onClick={() => cardClick(item.ProfileId)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-0">
                            <h3 className="font-bold text-foreground/90">
                              <h3>
                                {" "}
                                {item.UserProfile.fname}{" "}
                                {item.UserProfile.lname}
                              </h3>
                            </h3>

                            <p className="text-small text-foreground/80">
                              {item.Nationality}
                            </p>

                            <p className=" text-gray-600 text-sm">
                              Interests: {item.Interests.join(", ")}
                            </p>
                            <div className="flex justify-start items-center gap-4">
                              <Image
                                alt="Map"
                                width={15}
                                height={15}
                                src="/images/travellers/map-pin.svg"
                              />
                              <p className=" text-gray-600 text-sm">
                                {item.TravellingTo}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Image
                          src="/images/travellers/chat.svg"
                          alt="Chat"
                          height={40}
                          width={40}
                          onClick={ ()=> openConversation(item.ProfileId )}
                        />
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
