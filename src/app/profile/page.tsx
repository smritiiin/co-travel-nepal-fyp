"use client";
import Image from "next/image";
import { Avatar, Button, Divider } from "@nextui-org/react";
import { useToken } from "@/utils/token";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { getUsernameAndRoleFromToken } = useToken();
  const router = useRouter();

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
      {/* <div className="flex h-24 items-center justify-center space-x-8 text-center mb-101`">
        <div>
          <h1>21</h1>
          Blog
        </div>
        <Divider orientation="vertical" />
        <div>
          <h1>09</h1>
          Docs
        </div>
        <Divider orientation="vertical" />
        <div>
          <h1>222</h1>
          Source
        </div>
      </div> */}

      <div className="flex justify-center mb-10 gap-5">
        <Button
          color="primary"
          onClick={() => {
            router.push("/profile/create");
          }}
        >
          Edit Profile
        </Button>
        <Button
          className="border-2 border-[#A5A58D]"
          onClick={() => {
            router.push("/profile/create");
          }}
        >
          Update Travel Status
        </Button>
      </div>
    </div>
  );
};

export default Profile;
