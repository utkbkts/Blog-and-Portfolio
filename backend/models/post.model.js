import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    img: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    title: {
      type: String,
      required: true,
    },
    categoryHeader: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    category: {
      type: [String],
    },
    content: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    visit: {
      type: Number,
      default: 0,
    },
    liked: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likedCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

export default Post;
