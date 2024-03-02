"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="grid grid-flow-col w-40 px-4">
      <Image
        alt="Logo"
        className="block cursor-pointer"
        height="1"
        width="50"
        src="/images/logo.svg"
      ></Image>
      <div className="">
        <h3 className=" text-center font-bold text-accent">
          Co-Travel <br /> Nepal
        </h3>
      </div>
    </div>
  );
};

export default Logo;
