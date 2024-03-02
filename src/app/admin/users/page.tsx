import React from "react";
import SearchBar from "../SearchBar";
import NavAdmin from "../NavBar";

const Users = () => {
  return (
    <div className="flex h-screen">
      <NavAdmin />
      <div className="w-[75%] h-screen py-3">
        <SearchBar />
        <div className="flex gap-x-4">
          <h2 className="text-center">Users</h2>
          <h2 className="text-center">Travellers</h2>
          <h2 className="text-center">Guides</h2>
        </div>
      </div>
    </div>
  );
};

export default Users;
