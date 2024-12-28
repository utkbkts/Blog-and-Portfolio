import { catchAsyncError } from "catchasyncerror";
import Post from "../models/post.model.js";
import ErrorHandler from "../utils/handlerError.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

const findUserByClerkId = async (clerkUserId) => {
  const user = await User.findOne({ clerkUserId });
  if (!user) {
    throw new ErrorHandler("User not found", 400);
  }
  return user;
};

const getPosts = catchAsyncError(async (req, res) => {
  const posts = await Post.find();

  return res.status(200).json(posts);
});

const getPost = catchAsyncError(async (req, res) => {
  const post = await Post.findOne(req.params.id);

  return res.status(200).json(post);
});

// Create Post
const createPost = catchAsyncError(async (req, res, next) => {
  const requiredFields = Object.values(req.body).some((item) => !item);
  const clerkUserId = req.auth.userId;
  // Validate that the user exists
  const user = await findUserByClerkId(clerkUserId);

  if (user?.role === "user") {
    return next(new ErrorHandler("Just only admin create post", 400));
  }

  if (requiredFields) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Create new post
  const newPost = new Post({ user: user._id, ...req.body });
  const post = await newPost.save();
  return res.status(201).json(post);
});

// Delete Post
const deletePost = catchAsyncError(async (req, res, next) => {
  const clerkUserId = req.auth.userId;

  // Validate that the user exists
  const user = await findUserByClerkId(clerkUserId);

  if (user?.role === "user") {
    return next(new ErrorHandler("Just only admin create post", 400));
  }

  // Find and delete the post, only if it belongs to the user
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!post) {
    return next(
      new ErrorHandler("Post not found or not authorized to delete", 400)
    );
  }

  return res.status(200).json({ message: "Post has been deleted" });
});

const uploadPhoto = catchAsyncError(async (req, res, next) => {
  const result = imagekit.getAuthenticationParameters();
  res.json(result);
});

export default {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadPhoto,
};
