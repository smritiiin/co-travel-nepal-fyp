import { NAV_LINKS } from "@/constants";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import DarkLightMode from "../theme-changer/DarkLightMode";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-6 fixed w-full z-30 items-center bg-white">
      <Link href="/">
        <Logo />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex md:flex">
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

      <div className="flex items-center justify-end gap-1">
        <SearchBar />
        <DarkLightMode />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src="/images/user.svg"
                width={20}
                height={20}
              />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// https://daisyui.com/components/navbar/
