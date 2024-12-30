import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../models/post.model.js";
import { postData } from "../data/post.js";

dotenv.config();
const SeederProduct = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    //await Post.deleteMany();
    //console.log("postData Are Deleted !");

    await Post.insertMany(postData);
    console.log("postData Are Added !");
  } catch (error) {
    console.log(error);
  }
};

SeederProduct();
