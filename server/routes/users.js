import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifytoken } from "../middleware/auth.js";

const users = express.Router();

users.get("/:id", verifytoken, getUser);

users.get("/:id/friends", verifytoken, getUserFriends);

users.patch("/:id/:friendId", verifytoken, addRemoveFriend);

export default users;
