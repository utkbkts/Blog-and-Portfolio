import { catchAsyncError } from "catchasyncerror";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

const addComment = catchAsyncError(async (req, res, next) => {
  const clerkUserId = req.auth.userId;
  const postId = req.params.postId;
  console.log("🚀 ~ addComment ~ postId:", postId);

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

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
  const id = req.params.id;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }
  const user = User.findOne({ clerkUserId });

  if (user?.role === "admin") {
    await Comment.findByIdAndDelete(req.params.id);
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

export default {
  addComment,
  getComments,
  deleteComment,
};
