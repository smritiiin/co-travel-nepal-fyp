import { z } from "zod";

export const signupValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});
