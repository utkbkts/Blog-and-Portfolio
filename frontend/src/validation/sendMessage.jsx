import { z } from "zod";

const messageIsRequired = z
  .string({
    required_error: "zorunlu alan",
  })
  .min(1, "Alanlar boş bırakılamaz")
  .regex(/^[^<>/]*$/, "Geçersiz karakterler girdin.");

export const messageSendValidation = z.object({
  subject: messageIsRequired,
  email: messageIsRequired,
  desc: messageIsRequired,
});
