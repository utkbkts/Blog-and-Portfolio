import { z } from "zod";

const messageIsRequired = z
  .string({
    required_error: "required",
  })
  .min(1, "Message cannot be empty")
  .regex(/^[^<>/]*$/, "Invalid characters in message");

export const createMessageSchema = z.object({
  title: messageIsRequired,
  category: messageIsRequired,
  desc: messageIsRequired,
  content: z
    .string({
      required_error: "required",
    })
    .min(1, "Message cannot be empty"),
});
