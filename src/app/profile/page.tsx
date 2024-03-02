import Image from "next/image";
import { Divider } from "@nextui-org/react";

const Profile = () => {
  return (
    <div className=" flex flex-col gap-5">
      <div className=" z-0">
        <Image
          src="/images/koshibarrage.svg"
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
        <h2>NAME</h2>
        <h4 className=" text-[#6C6C6C]">Location</h4>
        <p className="font-bold"> I love travellinggg yeyyyy!</p>
      </div>
      <div className="flex h-24 items-center justify-center space-x-8 text-center mb-101`">
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
      </div>
    </div>
  );
};

export default Profile;
