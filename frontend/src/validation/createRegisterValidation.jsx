import { z } from "zod";

const usernameRequired = z
  .string({
    required_error: "required",
  })
  .min(6, "Username must be maximum 6 characters")
  .regex(/^[^<>/]*$/, "Invalid characters in message");

const passwordRequired = z
  .string({
    required_error: "required",
  })
  .min(6, "Password must be maximum 6 characters")
  .regex(/^[^<>/]*$/, "Invalid characters in message");

export const createRegisterSchema = z.object({
  username: usernameRequired,
  email: z.string().email(),
  password: passwordRequired,
  img: z.object({
    secure_url: z.string(),
    public_id: z.string(),
  }),
});

export const createLoginSchema = z.object({
  email: z.string().email(),
  password: passwordRequired,
});
