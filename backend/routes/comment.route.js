import express from "express";
import commentController from "../controllers/comment.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/newComment/:title/:postId",
  isAuthenticatedUser,
  commentController.addComment
);
router.get("/:title/:postId", commentController.getComments);

router.delete(
  "/delete/:commentId",
  isAuthenticatedUser,
  commentController.deleteComment
);
router.put(
  "/:commentId",
  isAuthenticatedUser,
  commentController.updatedComment
);

export default router;
