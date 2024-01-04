import { Button } from "@nextui-org/react";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="flex justify-end w-full">
      <div className="flex-col ">
        <h1>Start your journey by one click, explore the beauty of Nepal!</h1>
        <p>
          Plan and book your perfect trip with expert advice, travel tips,
          destination information and inspiration from us!
        </p>
        <div className="flex gap-x-2">
          <Button color="primary">Explore</Button>
          <Button color="primary">Connect</Button>
        </div>
      </div>
      <Image
        alt="Home Page"
        className=""
        height="800"
        width="800"
        src="/images/landing.svg"
      ></Image>
    </div>
  );
};

export default LandingPage;