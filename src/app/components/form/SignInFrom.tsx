import { useState } from "react";
import { login } from "../../api/login";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  email: string;
  password: string;
};

const SignInFrom = () => {
  // declare zod schema
  const schema: ZodType<FormData> = z.object({
    email: z.string().nonempty("Email is required").email(),
    password: z.string().nonempty("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const [loginError, setLoginError] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onLogin = async (e: FormData) => {
    const resp: any = await login(e);
    console.log("THIS IS RESPONSE: ", resp);
    if (resp.success) {
      console.log("Login Sucessful");
      document.cookie = `x-access-token=${resp.data.token}; path=/;`;
      console.log("COOKIE is : ", document.cookie);
      if (resp.data.role === "ADMIN") {
        router.push("/admin");
      } else if (resp.data.role === "AGENT") {
        router.push("/agent");
      } else {
        router.push("/");
      }
      console.log("ROLE is : ", resp.data.role);
    } else {
      setLoginError("Invalid Email and Password");
    }
  };

  return (
    <div className=" mt-10 flex flex-col space-y-3">
      <h1>Welcome Back!</h1>
      <form
        className="space-y-3 flex flex-col"
        onSubmit={handleSubmit(onLogin)}
      >
        <div className=" w-full md:flex-nowrap gap-4">
          <Input
            type="email"
            {...register("email", { required: true })}
            label="Email"
            name="email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            label="Password"
            {...register("password")}
            type={isVisible ? "text" : "password"}
            name="password"
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
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        {loginError && <span className="error">{loginError}</span>}

        {/* <p className=" text-blue-400 underline text-right">Forgot Password?</p> */}
        <Button type="submit" color="primary">
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
  );
};

export default SignInFrom;
