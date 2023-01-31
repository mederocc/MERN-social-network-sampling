import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const users = express.Router();

users.get("/:id", verifyToken, getUser);

users.get("/:id/friends", verifyToken, getUserFriends);

users.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default users;
