import { catchAsyncError } from "catchasyncerror";
import ErrorHandler from "../utils/handlerError.js";
import Comment from "../models/comment.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const addComment = catchAsyncError(async (req, res, next) => {
  const userId = req?.user?._id;
  const postId = req.params.postId;
  const { comment, button } = req.body;

  if (!userId) {
    return res.status(401).json("Not authenticated!");
  }

  if (button) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_PRO_APP_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = comment + "Correct this comment for me and make more sense.";

    await model.generateContent(prompt);
  }

  const existingComment = await Comment.findOne({
    user: userId,
    post: postId,
  });

  if (existingComment) {
    return res.status(409).json("You have already commented on this post!");
  }
  const data = await Comment.create({
    comment,
    user: userId,
    post: postId,
  });

  return res.status(201).json(data);
});

const getComments = catchAsyncError(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user")
    .sort({ createdAt: -1 });

  return res.json(comments);
});

const deleteComment = catchAsyncError(async (req, res) => {
  const userId = req.user?._id;
  const id = req.params.commentId;

  try {
    if (!userId) {
      return res.status(401).json("Not authenticated!");
    }

    if (req.user?.role === "admin") {
      await Comment.findByIdAndDelete({ _id: id });
      return res.status(200).json("Comment has been deleted");
    }

    const deletedComment = await Comment.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedComment) {
      return res.status(403).json("You can delete only your comment!");
    }
    return res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

const updatedComment = catchAsyncError(async (req, res, next) => {
  const userId = req?.user?._id;
  const commentId = req.params.commentId;
  const { comment } = req.body;
  console.log("🚀 ~ updatedComment ~ comment:", comment);

  if (!userId) {
    return next(new ErrorHandler("Not authenticated", 401));
  }

  const updatedComment = await Comment.findOneAndUpdate(
    { _id: commentId, user: userId },
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
