import { Button } from "@nextui-org/react";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col justify-around items-center h-full w-1/2 px-3 pb-5 ">
        {/* Opening text div */}
        <div>
          <h1>
            Start your journey <br />
            by one click, explore the beauty of Nepal!
          </h1>
          <br />
          <p>
            Plan and book your perfect trip with expert advice, travel tips,
            destination information and inspiration from us!
          </p>
        </div>
        <div className="flex justify-start items-center gap-x-4 w-full">
          <Button color="primary" size="lg" className=" w-44">
            Explore
          </Button>
          <Button color="primary" size="lg" className="w-44">
            Connect
          </Button>
        </div>
      </div>
      <div className="w-1/2">
        <Image
          alt="Home Page"
          // className=" m-10 "
          height="800"
          width="800"
          src="/images/landing.svg"
        ></Image>
      </div>
    </div>
  );
};

export default LandingPage;
