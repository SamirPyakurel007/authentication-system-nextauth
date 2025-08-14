import { z } from "zod";

export const usernameValidationSchema = z
  .string()
  .min(2, "username must be atleast 2 characters")
  .max(20, "username must be no more than 20 character")
  .regex(/^[a-zA-Z0-9_]+$/, "username should not include special character");

export const signUpSchema = z.object({
  username: usernameValidationSchema,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" }),
});

export const signInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const verifySchema = z.object({
  code: z
    .string()
    .length(6, { message: "verification code must be 6 characters" }),
});
