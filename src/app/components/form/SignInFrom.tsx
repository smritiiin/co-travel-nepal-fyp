import { useState } from "react";
import { login } from "../../api/login";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SignInFrom = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onLogin = async (e: any) => {
    e.preventDefault();

    const resp: any = await login({ email, password });
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
      // window.location.href = "/";
      // router.push("/");
    } else {
      alert("Something went wrong...");
      // alert(resp.error);
    }
  };
  return (
    <div className=" mt-10 flex flex-col space-y-3">
      <h1>Welcome Back!</h1>
      <form className="space-y-3 flex flex-col">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="email"
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            label="Password"
            type={isVisible ? "text" : "password"}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
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

        <p className=" text-blue-400 underline text-right">Forgot Password?</p>

        <Button type="submit" color="primary" onClick={onLogin}>
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

// import { loginValidation } from "@/app/auth/validation/loginValidation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import * as z from "zod";

// import { Input, Button, Checkbox } from "@nextui-org/react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const SignInFrom = () => {
//   const [isVisible, setIsVisible] = React.useState(false);

//   const toggleVisibility = () => setIsVisible(!isVisible);

//   type Inputs = {
//     email: string;
//     password: string;
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<Inputs>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     resolver: zodResolver(loginValidation),
//   });
//   const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
// };
// export default SignInFrom;
