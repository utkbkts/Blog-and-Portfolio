import express from "express";
import increaseVisit from "../middlewares/increaseVisit.js";
import postController from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/create", postController.createPost);
router.delete("/:id", postController.deletePost);

export default router;
