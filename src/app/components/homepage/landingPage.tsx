import { Button } from "@nextui-org/react";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center h-screen">
      <div className="flex flex-col justify-around items-center h-full w-full md:w-1/2 px-3 pb-5 text-center md:text-left">
        {/* Opening text div */}
        <div className="px-4 md:px-0">
          <h1 className="text-2xl md:text-4xl font-bold">
            Start your journey <br />
            by one click, explore the beauty of Nepal!
          </h1>
          <br />
          <p className="text-sm md:text-lg">
            Plan and book your perfect trip with expert advice, travel tips,
            destination information and inspiration from us!
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4 w-full px-4 md:px-0">
          <Button color="primary" size="lg" className="w-44">
            Explore
          </Button>
          <Button color="primary" size="lg" className="w-44">
            Connect
          </Button>
        </div>
      </div>
      <div className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end">
        <Image
          alt="Home Page"
          height="800"
          width="800"
          src="/images/landing.svg"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default LandingPage;
