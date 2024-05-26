import React from "react";
import { Link, Image, Button } from "@nextui-org/react";
import { useToken } from "@/utils/token";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const NavAgent = () => {
  const { getUsernameAndRoleFromToken } = useToken();

  const router = useRouter();

  const handleLogout = () => {
    const token = Cookies.get("x-access-token");
    // Clear token from cookie
    Cookies.remove("x-access-token");

    // Check if token is successfully cleared
    if (!Cookies.get("x-access-token")) {
      console.log("Logout successful");
      return router.push("/auth/login");
    } else {
      console.log("Logout failed");
    }
  };

  return (
    <div className=" flex flex-col items-center justify-around bg-[#EFF8FA] w-[25%]">
      <div className="flex flex-col items-center">
        <Image
          src="/images/admin/admin.png"
          alt="Admin Profile Picture"
          height={100}
          width={100}
          className="rounded-full mb-5 shadow-md"
        />
        <p className="font-semibold">
          {getUsernameAndRoleFromToken("x-access-token").username}{" "}
        </p>
        <p className="text-sm">
          {getUsernameAndRoleFromToken("x-access-token").role}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-y-4">
        <Link href="/admin" underline="hover" className="flex gap-7">
          <Image
            src="/images/admin/home.svg"
            alt="Home"
            height={20}
            width={20}
          ></Image>
          Home
        </Link>

        <Link href="/agent/booking" underline="hover" className="flex gap-7">
          {" "}
          <Image
            src="/images/admin/places.svg"
            alt="Places"
            height={20}
            width={20}
          ></Image>
          Booking
        </Link>
        <Link href="/agent/package" underline="hover" className="flex gap-7">
          {" "}
          <Image
            src="/images/admin/users.svg"
            alt="Users"
            height={20}
            width={20}
          ></Image>
          Packages
        </Link>
        <Link href="/agent/addPackage" underline="hover" className="flex gap-7">
          {" "}
          <Image
            src="/images/admin/users.svg"
            alt="Users"
            height={20}
            width={20}
          ></Image>
          Add Packages
        </Link>
      </div>

      <div>
        <Button onClick={handleLogout} className="flex gap-7">
          Logout{" "}
          <Image
            src="/images/admin/logout.svg"
            alt="Logout"
            height={20}
            width={20}
          ></Image>
        </Button>
      </div>
    </div>
  );
};

export default NavAgent;
