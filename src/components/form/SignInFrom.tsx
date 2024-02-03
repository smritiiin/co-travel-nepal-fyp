import { useState } from "react";
import { login } from "../../app/api/login";
import Link from "next/link";

const SignInFrom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e: any) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);
    const resp: any = await login({ email, password });
    if (resp.success) {
      console.log("Done.....")
      document.cookie = `x-access-token=${resp.data.token}; path=/;`;
    } else {
      alert("Something went wrong...");
      // alert(resp.error);
    }
  };
return(
  <div className="grid grid-cols place-items-center ">
    <form>
      <input
        placeholder="Email"
        type="text"
        name="email"
        className="block text-md font-medium text-gray-900 p-2 mx-10 my-3 rounded-md"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex">
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          className="block text-md font-medium text-gray-900 p-2 ml-10 mr-3 mb-3 rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* sign in button */}
      <div className=" flex justify-center">
        <button
          type="submit"
          className="bg-[#4e4ef3] text-[#FFFFFF] font-bold py-2 px-4 rounded-md hover:bg-[#FFFFFF] hover:text-blue-500"
          onClick={onLogin}
        >
          Continue
        </button>
      </div>
    </form>
  </div>
)};

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

//   return (
//     <div className=" mt-10 flex flex-col space-y-3">
//       <h1>Welcome Back!</h1>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="space-y-3 flex flex-col"
//       >
//         <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//           <Input type="email" label="Email" />
//         </div>

//         <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//           <Input
//             label="Password"
//             type={isVisible ? "text" : "password"}
//             endContent={
//               <button
//                 className="focus:outline-none"
//                 type="button"
//                 onClick={toggleVisibility}
//               >
//                 {isVisible ? (
//                   <FaEye className="text-2xl text-default-400 pointer-events-none" />
//                 ) : (
//                   <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
//                 )}
//               </button>
//             }
//           />
//         </div>

//         <p className=" text-blue-400 underline text-right">Forgot Password?</p>

//         <Button type="submit" color="primary" disabled={isSubmitting}>
//           Sign In
//         </Button>
//       </form>

//       <p className="flex gap-x-3">
//         Dont have an account?
//         <Link href="/auth/signup" className=" text-blue-600 font-semibold">
//           SignUp
//         </Link>
//       </p>
//     </div>
//   );
// };
// export default SignInFrom;
