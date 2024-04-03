import Image from "next/image";
import React from "react";

const ChatProfile = () => {
  return (
    <div>
      <Image src="/images/user.svg" alt="" width={32} height={32}></Image>
      <h3>Smritii Nepal</h3>
    </div>
  );
};

export default ChatProfile;
