import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

import { NAV_LINKS } from "@/utils";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import DarkLightMode from "../theme-changer/ThemeSwitcher";
import UserProfile from "./UserProfile";

// className="flex justify-between px-6 fixed w-full z-30 items-center bg-white
const Nav = () => {
  return (
    <Navbar
      shouldHideOnScroll
      className="flex justify-around max-w-full pr-5 overflow-hidden"
    >
      <NavbarBrand>
        <Link href="/">
          <Logo />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 mx-12" justify="center">
        <div className="h-full flex w-full px-5">
          <NavbarItem>
            {" "}
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
          </NavbarItem>
        </div>
      </NavbarContent>

      <div className="grid grid-flow-col w-40">
        <SearchBar />
        <DarkLightMode />
        <UserProfile />
      </div>
    </Navbar>
  );
};

export default Nav;
