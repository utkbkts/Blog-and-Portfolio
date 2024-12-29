import express from "express";
import increaseVisit from "../middlewares/increaseVisit.js";
import postController from "../controllers/post.controller.js";

const router = express.Router();

router.get("/upload-auth", postController.uploadPhoto);
router.get("/", postController.getPosts);
router.get("/:title/:id", postController.getPost);
router.post("/create", postController.createPost);
router.delete("/:id", postController.deletePost);
router.put("/:postId", postController.updatePost);

export default router;
