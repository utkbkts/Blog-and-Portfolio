import { catchAsyncError } from "catchasyncerror";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import sendToken from "../utils/sendToken.js";
import { sendVerificationToken } from "../utils/passwordTemplate.js";
import sendEmail from "../utils/sendEmail.js";

const register = catchAsyncError(async (req, res, next) => {
  const { username, email, img, password } = req.body;
  try {
    if (!username || !email || !img || !password) {
      return res.status(404).json({
        message: "All fields Required",
      });
    }

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return res.status(404).json({
        message: "Email is already",
      });
    }

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000;

    const messageHtml = sendVerificationToken(verificationToken);

    await User.create({
      username,
      email,
      img,
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
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

const verifyEmail = catchAsyncError(async (req, res) => {
  const { code } = req.body;
  try {
    if (!code) {
      return res.status(400).json({
        message: "Code is not found",
      });
    }

    const user = await User.findOne({
      verificationToken: code,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Verification Code",
      });
    }

    if (user.verificationTokenExpiresAt <= Date.now()) {
      return res.status(400).json({
        message: "Verification token has expired. Please request a new one.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter your Email or password",
      });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Email or password is incorrect.",
      });
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    if (user.isBlocked === true) {
      return res.status(404).json({
        message: "Your account has been blocked..",
      });
    }

    if (user.isVerified === false) {
      return res.status(404).json({
        message: "Please verify your account",
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

const logout = catchAsyncError(async (req, res, next) => {
  try {
    res.cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

const meProfile = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id);

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

const likePost = catchAsyncError(async (req, res, next) => {
  const userId = req?.user?._id;
  const postId = req?.params?.postId;

  if (!userId) {
    return res.status(400).json({
      message: "User Id Not Found",
    });
  }

  const postToLike = await Post.findById(postId);

  if (!postToLike) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const alreadyLiked = postToLike.liked.some(
    (like) => like.user.toString() === userId.toString()
  );

  if (alreadyLiked) {
    await Post.findByIdAndUpdate(postId, {
      $pull: { liked: { user: userId } },
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      $push: { liked: { user: userId } },
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

const verifySendClick = catchAsyncError(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized. Please log in.",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000;

  const messageHtml = sendVerificationToken(verificationToken);

  user.verificationToken = verificationToken;
  user.verificationTokenExpiresAt = verificationTokenExpiresAt;

  await user.save();

  await sendEmail({
    email: user.email,
    subject: "Verification Token",
    message: messageHtml,
  });

  res.status(200).json({
    message: "Verification token has been sent to your email.",
  });
});

export default {
  likePost,
  register,
  verifyEmail,
  login,
  logout,
  meProfile,
  verifySendClick,
};
