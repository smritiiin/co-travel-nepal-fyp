import React from "react";
import SearchBar from "../admin/SearchBar";
import Image from "next/image";

const Travellers = () => {
  return (
    <div className="bg-[#FAFDFD] rounded-2xl m-4 drop-shadow-md p-5">
      <div className="flex justify-around items-center">
        <h1> Find Friends</h1>
        <SearchBar />
        <Image
          src="/images/Travellers/Chat.svg"
          alt="Chat"
          width={90}
          height={20}
        ></Image>
      </div>
    </div>
  );
};

export default Travellers;
