import { catchAsyncError } from "catchasyncerror";
import Post from "../models/post.model.js";
import ErrorHandler from "../utils/handlerError.js";
import User from "../models/user.model.js";
import ImageKit from "imagekit";
import dotenv from "dotenv";
import apiFilter from "../utils/apiFilters.js";
import { generateSlug } from "../utils/generateSlug.js";
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
  const resPerPage = 5;
  const postsCount = await Post.countDocuments();

  const apiFeatures = new apiFilter(Post.find({}), req.query)
    .searchResults()
    .filters();

  let posts = await apiFeatures.query;
  let filteredProductsCount = posts.length;

  apiFeatures.pagination(resPerPage);
  posts = await apiFeatures.query.clone().populate("user");

  //blogs
  const blogPostsFilter = await Post.find({ categoryHeader: "Blog" }).populate(
    "user"
  );
  //Project
  const projectPostsFilter = await Post.find({
    categoryHeader: "Project",
  }).populate("user");

  return res.status(200).json({
    success: true,
    postsCount,
    resPerPage,
    filteredProductsCount,
    posts,
    blogPosts: blogPostsFilter,
    projectPosts: projectPostsFilter,
  });
});
const getPost = catchAsyncError(async (req, res) => {
  const { title, id } = req.params;
  const post = await Post.findOne({ title, _id: id }).populate("user");

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (generateSlug(post.title) !== title) {
    return res.status(400).json({
      success: false,
      message: `Title slug does not match. Expected: ${generateSlug(
        post.title
      )}, Got: ${title}`,
    });
  }

  return res.status(200).json(post);
});

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

const updatePost = catchAsyncError(async (req, res, next) => {
  const clerkUserId = req.auth.userId;
  const postId = req.params.postId;
  const { title, desc, category, categoryHeader, img, content } = req.body;

  const user = await findUserByClerkId(clerkUserId);

  if (user?.role === "user") {
    return next(new ErrorHandler("Just only admin create post", 400));
  }

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      title,
      desc,
      category,
      categoryHeader,
      img,
      content,
    },
    { new: true, runValidators: true }
  );

  if (!post) {
    return next(
      new ErrorHandler("Post not found or not authorized to update", 400)
    );
  }

  return res.status(200).json({
    message: "Post updated successfully!",
    post,
  });
});

const getCategories = catchAsyncError(async (req, res, next) => {
  const categories = await Post.distinct("category");

  return res.status(200).json({
    success: true,
    categories,
  });
});

export default {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadPhoto,
  updatePost,
  getCategories,
};
