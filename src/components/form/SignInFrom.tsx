import { loginValidation } from "@/app/auth/validation/loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import CoverImg from "../CoverImg";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

import { Input, Button, Checkbox } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignInFrom = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginValidation),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className=" flex justify-center items-center ">
      <div>
        <CoverImg />
      </div>
      <div className=" mt-10 flex flex-col space-y-3">
        <h1>Welcome Back!</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 flex flex-col"
        >
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input type="email" label="Email" />
          </div>

          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              label="Password"
              type={isVisible ? "text" : "password"}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>

          {/* <input
            type="text"
            id="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email?.message && (
            <div className=" text-red-500">{errors.email?.message}</div>
          )}

          <input
            type="text"
            id="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            {...register("password")}
            disabled={isSubmitting}
          />
          {errors.password?.message && (
            <div className=" text-red-500">{errors.password?.message}</div>
          )} */}

          {/* <button type="submit" disabled={isSubmitting} className="btn">
            Login
          </button> */}

          <p className=" text-blue-400 underline text-right">
            Forgot Password?
          </p>

          <Button type="submit" color="primary" disabled={isSubmitting}>
            Sign In
          </Button>
        </form>

        <p className="flex gap-x-3">
          Dont have an account?
          <Link href="/auth/signup" className=" text-blue-600 font-semibold">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignInFrom;
