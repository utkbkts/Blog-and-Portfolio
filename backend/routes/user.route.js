import express from "express";
import userController from "../controllers/user.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/:postId", isAuthenticatedUser, userController.likePost);

router.post("/register", userController.register);

router.post("/verify", userController.verifyEmail);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

router.get("/me", isAuthenticatedUser, userController.meProfile);

export default router;
