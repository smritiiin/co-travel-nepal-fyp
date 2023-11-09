"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const CoverImg = () => {
  const router = useRouter();
  return (
    <Image
      alt="Logo"
      className="block m-5"
      height="500"
      width="500"
      src="/images/login-cover.svg"
    ></Image>
  );
};

export default CoverImg;
