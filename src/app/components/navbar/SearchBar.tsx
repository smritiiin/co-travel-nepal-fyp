import { useTheme } from "next-themes";
import React from "react";

const SearchBar = () => {
  const { theme } = useTheme();
  return (
    //  change to a new component */}
    <div className="flex group pr-1 h-10 w-fit">
      <div className=" ease-in-out duration-5000 group-hover:w-full group-focus-within:w-full group-focus-within:bg-white flex group-hover:bg-white items-center justify-between w-0 rounded-full shadow-xl p-1 sticky">
        {/* <!-- text input --> */}
        <input
          className=" opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 invisible group-hover:visible group-focus-within:visible ease-in-out duration-700 font-bold uppercase rounded-full w-24 h-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
          type="text"
          placeholder="Search"
        ></input>
        {/* <!-- search icon --> */}
        <button className=" -ml-[124px] group-hover:ml-auto group-focus-within:ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon h-10 w-10"
            viewBox="0 0 512 512"
          >
            <title>Search</title>
            <path
              d="M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192 192-86.13 192-192S361.87 64 256 64zm91.31 283.31a16 16 0 01-22.62 0l-42.84-42.83a88.08 88.08 0 1122.63-22.63l42.83 42.84a16 16 0 010 22.62z"
              fill={theme === "dark" ? "#ffffff" : "#000000"} // Set the fill color based on the theme
            />
            <circle cx="232" cy="232" r="56" />
          </svg>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon h-10 w-10"
            viewBox="0 0 512 512"
          >
            <title>Search</title>
            <path d="M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192 192-86.13 192-192S361.87 64 256 64zm91.31 283.31a16 16 0 01-22.62 0l-42.84-42.83a88.08 88.08 0 1122.63-22.63l42.83 42.84a16 16 0 010 22.62z" />
            <circle cx="232" cy="232" r="56" />
          </svg> */}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
