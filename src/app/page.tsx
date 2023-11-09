"use client"

import Image from "next/image";
import { useState } from "react";

export default function Home() {
 const [imageUrl, setImageUrl] = useState("/images/user.svg");

  const handleClick = (image: string) => {
    console.log(image);
    setImageUrl(`/images/${image}.svg`);
  };
  const images = [
    "/images/koshibarrage.svg",
    "/images/login-cover.svg",
    "/images/logo.svg",
  ];
  return (
    <div className=" bg-[url(/images/koshibarrage.svg')]">
      {images.map((image: string, index) => (
        <Image
          alt="Home Page"
          key={index}
          className=" block "
          height="100"
          width="11111"
          src="/images/koshibarrage.svg"
          onClick={() => handleClick(image)}
        ></Image>
      ))}
    </div>);
}
