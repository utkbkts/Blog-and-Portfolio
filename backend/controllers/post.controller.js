import { catchAsyncError } from "catchasyncerror";
import Post from "../models/post.model.js";
import ErrorHandler from "../utils/handlerError.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import apiFilter from "../utils/apiFilters.js";
import { generateSlug } from "../utils/generateSlug.js";
import { generateSitemap } from "../routes/generate.sitemap.js";
dotenv.config();

const findUserByClerkId = async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new ErrorHandler("User not found", 400);
  }
  return user;
};

const getPosts = catchAsyncError(async (req, res) => {
  const resPerPage = 5;
  const currentPage = Number(req.query.page) || 1;
  const skip = resPerPage * (currentPage - 1);

  const apiFeatures = new apiFilter(Post, req.query).searchResults().filters();

  const filteredPostsCount = await apiFeatures.query.clone().countDocuments();

  apiFeatures.pagination(resPerPage);

  const posts = await apiFeatures.query.populate("user");

  const pipeline = [
    {
      $facet: {
        posts: [
          { $match: {} },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: resPerPage },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: {
              path: "$user",
              preserveNullAndEmptyArrays: true,
            },
          },
        ],
        blogPosts: [
          { $match: { categoryHeader: "Blog" } },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: resPerPage },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: {
              path: "$user",
              preserveNullAndEmptyArrays: true,
            },
          },
        ],
        projectPosts: [
          { $match: { categoryHeader: "Project" } },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: resPerPage },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: {
              path: "$user",
              preserveNullAndEmptyArrays: true,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        postsCount: { $size: "$posts" },
        blogPostsCount: { $size: "$blogPosts" },
        projectPostsCount: { $size: "$projectPosts" },
      },
    },
  ];

  const results = await Post.aggregate(pipeline);
  const data = results[0];

  return res.status(200).json({
    success: true,
    ...data,
    resPerPage,
    posts,
    filteredPostsCount,
  });
});

const getPost = catchAsyncError(async (req, res) => {
  const { title, postId } = req.params;
  const post = await Post.findOne({
    title: generateSlug(title),
    _id: postId,
  }).populate("user");

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  return res.status(200).json(post);
});

const createPost = catchAsyncError(async (req, res, next) => {
  const { title, desc, category, categoryHeader, content } = req.body;

  if (!title || !desc || !category || !categoryHeader || !content) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  console.log("🚀 ~ createPost ~ category:", category)

  const userId = req.user._id;
  const user = await findUserByClerkId(userId);

  if (user?.role === "user") {
    return next(new ErrorHandler("Just only admin create post", 400));
  }

  const newPost = new Post({ user: userId, ...req.body });
  const post = await newPost.save();
  generateSitemap();

  return res.status(201).json(post);
});

const deletePost = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const user = await findUserByClerkId(userId);

  if (user?.role === "user") {
    return next(new ErrorHandler("Just only admin create post", 400));
  }

  // Find and delete the post, only if it belongs to the user
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    user: userId,
  });

  if (!post) {
    return next(
      new ErrorHandler("Post not found or not authorized to delete", 400)
    );
  }

  return res.status(200).json({ message: "Post has been deleted" });
});

const updatePost = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const postId = req.params.postId;
  const { title, desc, category, categoryHeader, img, content } = req.body;

  const user = await findUserByClerkId(userId);

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
  updatePost,
  getCategories,
};
