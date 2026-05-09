import { z } from "zod";

export const registrationValidationSchema = z
  .object({
    name: z
      .string({ message: "Please enter your name" })
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name must be less than 50 characters" }),

    email: z
      .string({ message: "Please enter your email" })
      .email({ message: "Invalid email address" })
      .or(z.literal(""))
      .optional(),

    phone: z.preprocess(
      (val) => (typeof val === "string" ? val.replace(/\s+/g, "") : val),
      z
        .string({ message: "Please enter your phone number" })
        .regex(/^01\d{9}$/, { message: "Invalid phone number" }),
    ),

    password: z
      .string({ message: "Please enter a password" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(32, { message: "Password must be no more than 32 characters" }),

    confirmPassword: z.string({ message: "Please enter password again" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });
export const loginValidationSchema = z.object({
  // phone: z
  //   .string({ message: "Please enter your phone number" })
  //   .transform((val) => val.replace(/\s+/g, ""))
  //   .refine(/^01\d{9}$/, { message: "Invalid phone number" }),
  phone: z.preprocess(
    (val) => (typeof val === "string" ? val.replace(/\s+/g, "") : val),
    z
      .string({ message: "Please enter your phone number" })
      .regex(/^01\d{9}$/, { message: "Invalid phone number" }),
  ),

  password: z
    .string({ message: "Please enter a password" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(32, { message: "Password must be no more than 32 characters" }),
});
