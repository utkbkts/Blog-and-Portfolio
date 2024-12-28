import express from "express";
import commentController from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/newComment/:title/:postId", commentController.addComment);
router.get("/:title/:postId", commentController.getComments);
router.delete("/:title/:postId", commentController.deleteComment);

export default router;
