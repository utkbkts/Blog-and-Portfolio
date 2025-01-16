import { catchAsyncError } from "catchasyncerror";
import ErrorHandler from "../utils/handlerError.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { upload_file } from "../utils/cloudinary.js";
import sendToken from "../utils/sendToken.js";
import { sendVerificationToken } from "../utils/passwordTemplate.js";
import sendEmail from "../utils/sendEmail.js";

const register = catchAsyncError(async (req, res, next) => {
  const { username, email, img, password } = req.body;

  if (!username || !email || !img || !password) {
    return next(new ErrorHandler("All fields required", 404));
  }

  const isEmailExist = await User.findOne({ email });

  if (isEmailExist) {
    return next(new ErrorHandler("Email is already", 404));
  }

  let picture = {};

  if (img) {
    try {
      const avatarUpload = await upload_file(img, "website/avatar");
      picture = {
        public_id: avatarUpload.public_id,
        url: avatarUpload.url,
      };
    } catch (error) {
      return next(new ErrorHandler("Error uploading image to Cloudinary", 500));
    }
  }
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000;

  const messageHtml = sendVerificationToken(verificationToken);

  await User.create({
    username,
    email,
    img: picture,
    password,
    verificationToken,
    verificationTokenExpiresAt,
  });
  await sendEmail({
    email,
    subject: "Verification Token",
    message: messageHtml,
  });

  return res.status(201).json({
    message: "Check and verify your email account",
  });
});

const verifyEmail = catchAsyncError(async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    return next(new ErrorHandler("Code is not found", 400));
  }

  const user = await User.findOne({
    verificationToken: code,
    verificationTokenExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid Verification Code", 400));
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;

  await user.save();

  sendToken(user, 200, res);
});

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter your Email or password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Email or password is incorrect.", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Password is incorrect", 401));
  }

  if (user.isBlocked === true) {
    return next(new ErrorHandler("Your account has been blocked..", 401));
  }

  if (user.isVerified === false) {
    return next(new ErrorHandler("Please verify your account", 401));
  }
  sendToken(user, 200, res);
});

const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

const meProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);

  res.status(200).json({
    user,
  });
});

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
  register,
  verifyEmail,
  login,
  logout,
  meProfile,
};
