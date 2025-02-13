import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Lütfen Giriş Yap.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
