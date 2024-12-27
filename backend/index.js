import express from "express";
import dotnev from "dotenv";
import path from "path";
import cors from "cors";
import ConnectedDatabase from "./db/mongoDb.js";
import { clerkMiddleware } from "@clerk/express";

//routes
import postRouter from "./routes/post.route.js";
import webHookRouter from "./routes/webhook.route.js";
import commentRouter from "./routes/comment.route.js";
const __dirname = path.resolve();
dotnev.config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(clerkMiddleware());
app.use("/webhooks", webHookRouter);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  ConnectedDatabase();
  console.log(`Server is running on port ${process.env.PORT}`);
});
