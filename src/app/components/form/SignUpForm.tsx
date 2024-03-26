import { signupValidation } from "@/app/auth/validation/signupValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import CoverImg from "../CoverImg";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "../../api/signup";

import { Input, Button, Checkbox } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import * as z from "zod";

const SignUpForm = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignup = async (e: any) => {
    e.preventDefault();
    // console.log("Email: ", email);
    // console.log("Password: ", password);

    const resp: any = await signup({
      email,
      fname,
      lname,
      password,
      confirmPassword,
    });
    console.log("THIS IS RESPONSE: ", resp);
    if (resp.success) {
      console.log("Signup Sucessful");
      document.cookie = `x-access-token=${resp.data.token}; path=/;`;
      // window.location.href = "/auth/login";
    } else {
      console.log("Something went wrong...");
      console.log(resp.error);
      // alert(resp.error);
    }
  };

  // type Inputs = {
  //   email: string;
  //   username: string;
  //   password: string;
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<Inputs>({
  //   defaultValues: {
  //     email: "",
  //     username: "",
  //     password: "",
  //   },
  //   resolver: zodResolver(signupValidation),
  // });
  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col">
        <h1>Create an account!</h1>

        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 flex flex-col"
        >
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="email"
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex gap-x-2">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="text"
                label="First Name"
                name="fname"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input
                type="text"
                label="Last Name"
                name="lname"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              // type="password"
              label="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility1}
                >
                  {isVisible1 ? (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible1 ? "text" : "password"}
            />
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              // type="password"
              label="Confirm Password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility2}
                >
                  {isVisible2 ? (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible2 ? "text" : "password"}
            />
          </div>

          {/* <Input
            type="text"
            id="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email?.message && (
            <div className=" text-red-500">{errors.email?.message}</div>
          )} */}

          {/* <Input
            type="text"
            id="username"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            {...register("username")}
            disabled={isSubmitting}
          />
          {errors.username?.message && (
            <div className=" text-red-500">{errors.username?.message}</div>
          )}

          <Input
            type="password"
            id="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            {...register("password")}
            disabled={isSubmitting}
          />
          {errors.password?.message && (
            <div className=" text-red-500">{errors.password?.message}</div>
          )} */}

          {/* <Checkbox>Option</Checkbox> */}

          <Button type="submit" color="primary" onClick={onSignup}>
            Sign Up
          </Button>
        </form>

        <p className="flex gap-x-2 mt-5">
          Already have an account?
          <Link href="/auth/login" className=" text-blue-600 font-semibold">
            Log in
          </Link>
        </p>
      </div>
      {/* <div>
        <CoverImg />
      </div> */}
    </div>
  );
};

export default SignUpForm;
