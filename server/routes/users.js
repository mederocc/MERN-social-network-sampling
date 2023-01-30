import express from "express";
import {
  getUser,
  GetUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifytoken } from "../middleware/auth.js";

const users = express.Router();

users.get("/:id", verifytoken, async (req, res) => {});

users.get("/:id/friends", verifytoken, async (req, res) => {});

users.patch("/:id/:friendId", verifytoken, async (req, res) => {});

export default users;
