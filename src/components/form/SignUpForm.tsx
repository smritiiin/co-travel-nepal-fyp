import { signupValidation } from "@/app/auth/validation/signupValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
// import CoverImg from "../CoverImg";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";

const SignUpForm = () => {
  type Inputs = {
    email: string;
    username: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(signupValidation),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col">
        <h1>Create an account!</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex flex-col">
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
            id="username"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            {...register("username")}
            disabled={isSubmitting}
          />
          {errors.username?.message && (
            <div className=" text-red-500">{errors.username?.message}</div>
          )}

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            {...register("password")}
            disabled={isSubmitting}
          />
          {errors.password?.message && (
            <div className=" text-red-500">{errors.password?.message}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            Sign Up
          </button>
        </form>

        <p>Already have an account? </p>
        <Link href="/login">Log in</Link>
      </div>
      <div>{/* <CoverImg /> */}</div>
    </div>
  );
};

export default SignUpForm;
