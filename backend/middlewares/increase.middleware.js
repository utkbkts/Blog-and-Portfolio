import Post from "../models/post.model.js";

const IncreaseVisit = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    await Post.findByIdAndUpdate(postId, { $inc: { visit: 1 } });
    next();
  } catch (error) {
    console.error("IncreaseVisit Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export default IncreaseVisit;
