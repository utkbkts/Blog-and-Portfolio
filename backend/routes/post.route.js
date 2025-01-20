import express from "express";
import postController from "../controllers/post.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";
import IncreaseVisit from "../middlewares/increase.middleware.js";

const router = express.Router();

router.get("/", postController.getPosts);
router.get("/details/:title/:postId", IncreaseVisit, postController.getPost);
router.get("/categories", postController.getCategories);
router.post("/create", isAuthenticatedUser, postController.createPost);
router.delete("/:id", isAuthenticatedUser, postController.deletePost);
router.put("/:postId", isAuthenticatedUser, postController.updatePost);

export default router;
