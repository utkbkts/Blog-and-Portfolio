import { catchAsyncError } from "catchasyncerror";
import ErrorHandler from "../utils/handlerError.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

const likePost = catchAsyncError(async (req, res, next) => {
  const clerkUserId = req.auth.userId;
  const postId = req.params.postId;

  if (!clerkUserId) {
    return next(new ErrorHandler("Clerk User Id Not Found", 404));
  }

  const userMe = await User.findOne({ clerkUserId });
  const postToLike = await Post.findById(postId);

  if (!userMe) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (!postToLike) {
    return next(new ErrorHandler("Post not found", 404));
  }

  const alreadyLiked = postToLike.liked.some(
    (like) => like.user.toString() === userMe._id.toString()
  );

  if (alreadyLiked) {
    await Post.findByIdAndUpdate(postId, {
      $pull: { liked: { user: userMe._id } },
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      $push: { liked: { user: userMe._id } },
    });
  }

  // Synchronize likedCount
  const updatedPost = await Post.findById(postId);
  const totalLikes = updatedPost.liked.length;
  updatedPost.likedCount = totalLikes;
  await updatedPost.save();

  res.status(200).json({
    message: alreadyLiked
      ? "Like removed successfully!"
      : "Post liked successfully!",
    likedCount: totalLikes,
  });
});

export default {
  likePost,
};
