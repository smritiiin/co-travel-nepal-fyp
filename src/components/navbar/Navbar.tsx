import {
  Navbar,
  NavbarBrand,
  Link,
} from "@nextui-org/react";

import { NAV_LINKS } from "@/constants";
import Logo from "./Logo";
import Image from "next/image";
import SearchBar from "./SearchBar";
import DarkLightMode from "../theme-changer/DarkLightMode";
import UserProfile from "./UserProfile";

// className="flex justify-between px-6 fixed w-full z-30 items-center bg-white
const Nav = () => {
  return (
    <Navbar shouldHideOnScroll className=" flex justify-around w-full border">
      <NavbarBrand>
        <Link href="/">
          <Logo />
        </Link>
      </NavbarBrand>

      <div className="">
        <ul className="hidden h-full gap-12 lg:flex md:flex justify-center">
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
      </div>

      <div className="flex items-center border gap-1">
        <SearchBar />
        <DarkLightMode />
        <UserProfile />
      </div>
    </Navbar>
  );
};

export default Nav;
