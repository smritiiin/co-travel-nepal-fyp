import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

export const Conversation = ({
  conversation,
  currentUser,
}: {
  conversation: any;
  currentUser: any;
}) => {
const [user, setUser] = useState<{ fname: string } | null>(null);  //   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find(
      (m: any) => m.id !== currentUser
    )?.id;

    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:8000/api/user/user/" + friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="flex items-center p-3 mt-3 cursor-pointer hover:bg-gray-400">
      <Image
        className="rounded-2xl object-cover mr-5"
        //for profile Imagee
        // src={
        //   user?.profilePicture
        //     ? PF + user.profilePicture
        //     : PF + "person/noAvatar.png"
        // }
        alt=""
        src="/images/user.svg"
        width={32}
        height={32}
      />
      <span className=" font-medium">{user?.fname }</span>
    </div>
  );
};
