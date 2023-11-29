"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div className="flex">
      <Image
        alt="Logo"
        className="block cursor-pointer"
        height="1"
        width="50"
        src="/images/logo.svg"
      ></Image>
      <h2 className=" font-bold text-accent">
        Co-Travel <br /> Nepal
      </h2>
    </div>
  );
};

export default Logo;
