import { catchAsyncError } from "catchasyncerror";
import Post from "../models/post.model.js";
import ErrorHandler from "../utils/handlerError.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import apiFilter from "../utils/apiFilters.js";
import { generateSlug } from "../utils/generateSlug.js";
import { generateSitemap } from "../routes/generate.sitemap.js";
import {
  deleteCloudinary,
  uploadImagesToCloudinary,
} from "../utils/cloudinary.js";
dotenv.config();

const findUserByClerkId = async (userId) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new ErrorHandler("User not found", 400);
  }
  return user;
};

const getPosts = catchAsyncError(async (req, res) => {
  const resPerPage = 3;
  const currentPage = Number(req.query.page) || 1;
  const skip = resPerPage * (currentPage - 1);

  const apiFeatures = new apiFilter(Post, req.query).searchResults().filters();

  apiFeatures.pagination(resPerPage);

  const projectPostsCount = await Post.countDocuments({ categoryHeader: "Project" });

  const pipeline = [
    {
      $facet: {
        posts: [
          { $match: {} },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
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
    blogPosts: data.blogPosts,
    projectPosts: data.projectPosts,
    projectPostsCount,
    resPerPage,
    currentPage,
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
  const { title, desc, category, categoryHeader, content, img } = req.body;

  if (!title || !desc || !category || !categoryHeader || !content || !img) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const userId = req?.user?._id;
  const user = await findUserByClerkId(userId);

  if (user?.role === "user") {
    return next(new ErrorHandler("Just only admin can create posts", 400));
  }

  let uploadedImageUrls = "";
  try {
    uploadedImageUrls = await uploadImagesToCloudinary(img, "website/posts");

    const newPost = await Post.create({
      ...req.body,
      img: uploadedImageUrls,
      user: userId,
    });

    generateSitemap();

    return res.status(201).json(newPost);
  } catch (error) {
    if (uploadedImageUrls && uploadedImageUrls.public_id) {
      const deletePromises = await deleteCloudinary(
        uploadedImageUrls.public_id
      );

      if (Array.isArray(deletePromises)) {
        await Promise.all(deletePromises);
      }
    }

    next(error);
  }
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

  // Kullanıcıyı veritabanında bul
  const user = await findUserByClerkId(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Admin kontrolü
  if (user.role === "user") {
    return next(new ErrorHandler("Only admins can update posts", 403));
  }

  // Güncellenecek postu al
  const existingPost = await Post.findById(postId);
  if (!existingPost) {
    return next(new ErrorHandler("Post not found", 404));
  }

  let uploadedImageUrls = "";
  try {
    if (img) {
      // Yeni resmi yükle
      uploadedImageUrls = await uploadImagesToCloudinary(img, "website/posts");

      // Eski resmi sil
      if (existingPost.img && existingPost.img.public_id) {
        await deleteCloudinary(existingPost.img.public_id);
      }
    }

    // Postu güncelle
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        desc,
        category,
        categoryHeader,
        img: uploadedImageUrls || existingPost.img, // resim yoksa eski kalsın
        content,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Post updated successfully!",
      post: updatedPost,
    });
  } catch (error) {
    // Yeni yüklenen resmi sil (hata durumunda)
    if (uploadedImageUrls && uploadedImageUrls.public_id) {
      await deleteCloudinary(uploadedImageUrls.public_id);
    }

    next(error);
  }
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
