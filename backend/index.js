import express from "express";
import dotnev from "dotenv";
import path from "path";
import cors from "cors";
import ConnectedDatabase from "./db/mongoDb.js";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cookieParser from "cookie-parser";

//routes
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import userRouter from "./routes/user.route.js";
import contactRouter from "./routes/contact.route.js";

//socket
import { app, server } from "./socket/server.js";
const __dirname = path.resolve();
dotnev.config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//sanitize request data
app.use(mongoSanitize());

//compress response
app.use(compression());

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/contact", contactRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

ConnectedDatabase();
 server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const unexpectedErrorHandler = (error) => {
  server.close(() => {
    console.log("Server closed due to an unexpected error.");
    process.exit(1);
  });
};

const gracefulShutdown = () => {
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", gracefulShutdown);
