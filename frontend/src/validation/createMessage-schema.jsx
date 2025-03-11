import { z } from "zod";

const messageIsRequired = z
  .string({
    required_error: "required",
  })
  .min(1, "Message cannot be empty")
  .regex(/^[^<>/]*$/, "Invalid characters in message");

export const createMessageSchema = z.object({
  title: messageIsRequired,
  category: z.coerce.string(),
  desc: messageIsRequired,
  categoryHeader: messageIsRequired,
  img: z.object({
    public_id: z.string(),
    url: z.string().url("Invalid video URL").nonempty("Video URL is required"),
  }),
  content: z
    .string({
      required_error: "required",
    })
    .min(1, "Message cannot be empty"),
});
