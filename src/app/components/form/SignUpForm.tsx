import { signupValidation } from "@/app/auth/validation/signupValidation";
import Link from "next/link";
import React, { useState } from "react";
import { signup } from "../../api/signup";

import { Input, Button, Checkbox } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
// import { mailOptions, transporter } from "@/utils/nodemailer";

type FormData = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  //zod schema
  const schema: ZodType<FormData> = z
    .object({
      fname: z.string().nonempty("First Name is required"),
      lname: z.string().nonempty("Last Name is required"),
      email: z.string().nonempty("Email is required").email(),
      password: z.string().min(8).max(30),
      confirmPassword: z.string().min(8).max(30),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not  match",
      path: ["confirmPassword"],
    });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  const onSignup = async (e: FormData, res: any) => {
    const resp: any = await signup(e);
    console.log("THIS IS RESPONSE: ", resp);
    router.push("/auth/login");
  };

  return (
    <div className="flex justify-center items-center space-y-3">
      <div className="flex flex-col ">
        <h1>Create an account!</h1>

        <form onSubmit={handleSubmit(onSignup)} className="flex flex-col gap-3">
          <div className="flex-wrap md:flex-nowrap">
            <Input
              type="email"
              {...register("email")}
              label="Email"
              name="email"
            />
            {errors.email && (
              <span className=" text-red-500 text-sm ">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex gap-x-2">
            <div className="w-full flex-wrap md:flex-nowrap">
              <Input
                {...register("fname")}
                type="text"
                label="First Name"
                name="fname"
              />
              {errors.fname && (
                <span className="text-red-500 text-sm">
                  {errors.fname.message}
                </span>
              )}
            </div>
            <div className="w-full flex-wrap md:flex-nowrap">
              <Input
                type="text"
                {...register("lname")}
                label="Last Name"
                name="lname"
              />
              {errors.lname && (
                <span className=" text-red-500 text-sm ">
                  {errors.lname.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex-wrap md:flex-nowrap ">
            <Input
              {...register("password")}
              label="Password"
              name="password"
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
            {errors.password && (
              <span className=" text-red-500 text-sm ">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              {...register("confirmPassword")}
              label="Confirm Password"
              name="confirmPassword"
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
            {errors.confirmPassword && (
              <span className=" text-red-500 text-sm ">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button type="submit" color="primary">
            Sign Up
          </Button>
        </form>

        <p className="flex gap-x-2 text-xs text-gray-600 mt-5">
          Already have an account?
          <Link
            href="/auth/login"
            className=" text-blue-600 font-semibold underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
