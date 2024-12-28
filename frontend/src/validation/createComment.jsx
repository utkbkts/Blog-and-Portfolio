import { z } from "zod";

const messageIsRequired = z
  .string({
    required_error: "required",
  })
  .min(1, "cannot be empty")
  .regex(/^[^<>/]*$/, "Invalid characters in message");

export const createCommentSchema = z.object({
  comment: messageIsRequired,
});
