import { z } from "zod";

const messageIsRequired = z
  .string({
    required_error: "required field",
  })
  .min(1, "Fields cannot be left blank")
  .regex(/^[^<>/]*$/, "You entered invalid characters.");

export const messageSendValidation = z.object({
  subject: messageIsRequired,
  email: messageIsRequired,
  desc: messageIsRequired,
});
