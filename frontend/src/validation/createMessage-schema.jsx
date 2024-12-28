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
  img: z.string().url("Invalid image URL").nonempty("Image is required"),
  content: z
    .string({
      required_error: "required",
    })
    .min(1, "Message cannot be empty"),
});
