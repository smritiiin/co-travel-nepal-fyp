"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const CoverImg = () => {
  const router = useRouter();
  return (
    <Image
      alt="Logo"
      className=" md:block sm:hidden"
      height="480"
      width="480"
      src="/images/login-cover.svg"
    ></Image>
  );
};

export default CoverImg;
