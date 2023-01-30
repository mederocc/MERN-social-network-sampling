import express from "express";
import { verifytoken } from "../middleware/auth.js";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
const posts = express.Router();

posts.get("/", verifytoken, getFeedPosts);
posts.get("/:userId/posts", verifytoken, getUserPosts);
posts.patch("/:id/like", verifytoken, likePost);

export default posts;
