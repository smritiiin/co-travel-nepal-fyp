import { Button, Divider } from "@nextui-org/react";

import { NAV_LINKS } from "@/utils";
import { useToken } from "@/utils/token";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer = () => {
  const {isTokenAvailableAndNotExpired} = useToken();

  const router = useRouter();
  return (
    <div className="bg-[#42A7C3] rounded-t-[20px] w-full mt-auto">
      <div className=" bg-[url('/images/FooterBggg.svg')] px-20 py-3">
        <div className=" text-white  py-4 pt-20 ">
          <div className=" border-2 bg-[#5AB5CD] opacity-70 w-[90%] mx-auto rounded-xl flex justify-around p-10">
            <div>
              <p>Prepare yourself to be a part of exploration of</p>
              <h2 className=" font-bold text-xl">The Beauty of Nepal</h2>
            </div>
            <div className="flex flex-col gap-2 ">
              {isTokenAvailableAndNotExpired("x-access-token") ? (
                <>
                  <Button
                    className="bg-[#42A7C3] font-bold text-white"
                    onClick={() => router.push("/profile")}
                  >
                    Review
                  </Button>
                  
                  <Button
                    className="bg-white font-bold text-[#42A7C3] "
                    onClick={() => router.push("/auth/signup")}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="bg-[#42A7C3] font-bold text-white"
                    onClick={() => router.push("/auth/login")}
                  >
                   Login
                  </Button>
                  <Button
                    className="bg-white font-bold text-[#42A7C3] "
                    onClick={() => router.push("/auth/signup")}
                  >
                    Signup
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className=" mt-3 flex flex-col gap-3">
            <h2 className=" text-xl font-semibold">Co-Travel Nepal</h2>
            <ul className=" h-full gap-12 flex">
              {NAV_LINKS.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className="flex justify-center transition-all cursor-pointer hover:text-red-600"
                >
                  {link.label}
                </Link>
              ))}
            </ul>

            <Divider className=" bg-blue-50 " />
            <p> @ 2024 cotravelnepal.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
