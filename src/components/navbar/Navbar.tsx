import { NAV_LINKS } from "@/constants";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-6 fixed w-full z-30 items-center">
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

      <div className="flex items-center">
        <SearchBar />
        <div>
          <Image
            alt="User"
            className="block"
            height="30"
            width="30"
            src="/images/user.svg"
          ></Image>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// https://daisyui.com/components/navbar/
