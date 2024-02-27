"use client";

import CoverImg from "../../components/CoverImg";
import SignUpForm from "../../components/form/SignUpForm";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="  flex justify-around items-center h-screen py-3 overflow-hidden">
      <SignUpForm />
      <CoverImg />
    </div>
  );
};

export default Signup;
