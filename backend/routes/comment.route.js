import express from "express";
import commentController from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/newComment/:id", commentController.addComment);
router.get("/:id", commentController.getComments);
router.delete("/:id", commentController.deleteComment);

export default router;
