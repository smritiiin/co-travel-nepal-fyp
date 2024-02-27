import React from "react";
import NavBar from "../NavBar";
import SearchBar from "../SearchBar";

const Users = () => {
  return (
    <div className="flex h-screen">
      <NavBar />
      <div>
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
