import Image from "next/image";
import { useToken } from "@/utils/token";

const ChatProfile = () => {
  const {getUsernameAndRoleFromToken} = useToken();

  return (
    <div>
      <Image src="/images/user.svg" alt="" width={32} height={32}></Image>
      <h3>{getUsernameAndRoleFromToken("x-access-token").username}</h3>
    </div>
  );
};

export default ChatProfile;
