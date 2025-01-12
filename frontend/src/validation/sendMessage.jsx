import { z } from "zod";

const messageIsRequired = z
  .string({
    required_error: "required",
  })
  .min(1, "Message cannot be empty")
  .regex(/^[^<>/]*$/, "Invalid characters in message");

export const messageSendValidation = z.object({
  subject: messageIsRequired,
  email: messageIsRequired,
  desc: messageIsRequired,
});
