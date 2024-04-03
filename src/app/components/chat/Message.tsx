import Image from "next/image";
import "./Message.css";
import { format } from "timeago.js";

export const Message = ({ message, own }: { message: any; own: boolean }) => {
  return (
    <div className={own ? "message own" : "message"}>
      {/* <div className="flex flex-col mt-5 "> */}
      <div className="flex">
        <Image
          className=" rounded-lg object-cover mr-3 h-8 w-8"
          src="/images/user.svg"
          alt=""
          height={32}
          width={32}
        />
        <p className="messageText">{message.Text}</p>
      </div>
      <div className=" text-sm mt-2">{format(message.CreatedAt)}</div>
    </div>
  );
};
