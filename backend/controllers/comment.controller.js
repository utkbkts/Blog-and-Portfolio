import { catchAsyncError } from "catchasyncerror";
import ErrorHandler from "../utils/handlerError.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

const addComment = catchAsyncError(async (req, res, next) => {
  const clerkUserId = req.auth.userId;
  const postId = req.params.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  const existingComment = await Comment.findOne({
    user: user._id,
    post: postId,
  });

  if (existingComment) {
    return res.status(409).json("You have already commented on this post!");
  }
  const comment = await Comment.create({
    ...req.body,
    user: user._id,
    post: postId,
  });

  return res.status(201).json(comment);
});

const getComments = catchAsyncError(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user")
    .sort({ createdAt: -1 });

  return res.json(comments);
});

const deleteComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const id = req.params.commentId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }
  const user = await User.findOne({ clerkUserId });

  if (user?.role === "admin") {
    await Comment.findByIdAndDelete({ _id: id });
    return res.status(200).json("Comment has been deleted");
  }
  const deletedComment = await Comment.findOneAndDelete({
    _id: id,
    user: user._id,
  });

  if (!deletedComment) {
    return res.status(403).json("You can delete only your comment!");
  }

  res.status(200).json("Comment deleted");
};

const updatedComment = catchAsyncError(async (req, res, next) => {
  const clerkUserId = req.auth.userId;
  const commentId = req.params.commentId;
  const { comment } = req.body;

  if (!clerkUserId) {
    return next(new ErrorHandler("Not authenticated", 401));
  }

  const user = await User.findOne({ clerkUserId });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const updatedComment = await Comment.findOneAndUpdate(
    { _id: commentId, user: user._id },
    { comment },
    { new: true, runValidators: true }
  );

  if (!updatedComment) {
    return next(new ErrorHandler("You can only update your own comment!", 400));
  }

  return res.status(200).json({
    message: "Comment updated successfully!",
    comment: updatedComment,
  });
});

export default {
  addComment,
  getComments,
  deleteComment,
  updatedComment,
};
