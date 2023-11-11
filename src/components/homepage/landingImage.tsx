import { useState } from "react";
import Image from "next/image";

const LandingImage = () => {
  const [imageUrl, setImageUrl] = useState("/images/user.svg");

  const handleClick = (image: string) => {
    console.log(image);
    setImageUrl(`/images/${image}.svg`);
  };
  const images = [
    "/images/koshibarrage.svg",
    // "/images/login-cover.svg",
  ];
  return (
    <div className=" bg-[url(/images/koshibarrage.svg')] h-full w-full">
      {images.map((image: string, index) => (
        <Image
          alt="Home Page"
          key={index}
          className=" block "
          height="1100"
          width="11111"
          src="/images/koshibarrage.svg"
          onClick={() => handleClick(image)}
        ></Image>
      ))}
    </div>
  );
};

export default LandingImage;
