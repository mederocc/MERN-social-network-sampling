import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
const posts = express.Router();

posts.get("/", verifyToken, getFeedPosts);
posts.get("/:userId", verifyToken, getUserPosts);
posts.patch("/:id/like", verifyToken, likePost);

export default posts;
