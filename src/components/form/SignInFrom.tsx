import { loginValidation } from "@/app/auth/validation/loginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
// import CoverImg from "../CoverImg";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

const SignInFrom = () => {
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
      <div>{/* <CoverImg /> */}</div>
      <div className=" mt-10 flex flex-col space-y-3">
        <h1>Welcome Back!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
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
          )}

          <p>Forgot Password?</p>

          <button type="submit" disabled={isSubmitting} className="btn">
            Login
          </button>
        </form>

        <p>Dont have an account? </p>
        <Link href="/auth/signup">SignUp</Link>
      </div>
    </div>
  );
};
export default SignInFrom;
