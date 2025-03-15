import { z } from "zod";

const usernameRequired = z
  .string({
    required_error: "Zorunlu alan",
  })
  .min(1, "kullanıcı adı zorunlu")
  .regex(/^[^<>/]*$/, "Geçersiz karakter girildi.");

const passwordRequired = z
  .string({
    required_error: "Zorunlu alan",
  })
  .min(6, "Parola en az 6 karakter olmalıdır.")
  .regex(/^[^<>/]*$/, "Geçersiz karakter girildi.");

export const createRegisterSchema = z.object({
  username: usernameRequired,
  email: z
    .string({ message: "Zorunlu alan" })
    .email({ message: "Geçersiz Email" }),
  password: passwordRequired,
});

export const createLoginSchema = z.object({
  email: z.string().email(),
  password: passwordRequired,
});
