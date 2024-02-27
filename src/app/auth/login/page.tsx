"use client";
import CoverImg from "../../components/CoverImg";
import SignInFrom from "../../components/form/SignInFrom";

const login = () => {
  return (
    <div className=" flex justify-around items-center h-screen py-3 overflow-hidden">
      <CoverImg />
      <SignInFrom />
    </div>
  );
};

export default login;
