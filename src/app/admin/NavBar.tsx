import React from 'react'
import { Link, Image } from '@nextui-org/react';
const NavBar = () => {
  return (
    <div className=" flex flex-col items-center justify-around bg-[#EFF8FA] w-[25%]">
      <div className="flex flex-col items-center">
        <Image
          src="/images/admin/admin.svg"
          alt="Admin Profile Picture"
          height={100}
          width={100}
          className="rounded-full mb-5 shadow-md"
        />
        <p> Name </p>
        <p> Role</p>
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

        <Link href="/admin/places" underline="hover" className="flex gap-7">
          {" "}
          <Image
            src="/images/admin/places.svg"
            alt="Places"
            height={20}
            width={20}
          ></Image>
          Places
        </Link>
        <Link href="/admin/users" underline="hover" className="flex gap-7">
          {" "}
          <Image
            src="/images/admin/users.svg"
            alt="Users"
            height={20}
            width={20}
          ></Image>
          Users
        </Link>
        <Link href="/" underline="hover" className="flex gap-7">
          {" "}
          <Image
            src="/images/admin/agent.svg"
            alt="Agent"
            height={20}
            width={20}
          ></Image>
          Travel Agent
        </Link>
        <Link href="/" underline="hover" className="flex gap-7">
          <Image
            src="/images/admin/booking.svg"
            alt="Booking"
            height={20}
            width={20}
          ></Image>
          Booking{" "}
        </Link>
      </div>

      <div>
        <Link href="/" underline="hover" className="flex gap-7">
          Logout{" "}
          <Image
            src="/images/admin/logout.svg"
            alt="Logout"
            height={20}
            width={20}
          ></Image>
        </Link>
      </div>
    </div>
  );
}

export default NavBar