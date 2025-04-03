import { z } from "zod";
const usernameRequired = z
  .string({
    required_error: "Required field",
  })
  .min(1, "Username is required")
  .regex(/^[^<>/]*$/, "Invalid character entered.");

const passwordRequired = z
  .string({
    required_error: "Required field",
  })
  .min(6, "Password must be at least 6 characters long.")
  .regex(/^[^<>/]*$/, "Invalid character entered.");

export const createRegisterSchema = z.object({
  username: usernameRequired,
  email: z
    .string({ message: "Required field" })
    .email({ message: "Invalid email" }),
  password: passwordRequired,
});


export const createLoginSchema = z.object({
  email: z.string().email(),
  password: passwordRequired,
});
