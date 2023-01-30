import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { verifytoken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/* Configurations */

// path to current file
const __filename = fileURLToPath(import.meta.url); // allows us to grab file Url when we use modules (imports)

// path to current directory
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File storage */

// fin configurations in gitHub repo of multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.post("/auth/register", upload.single("picture"), register); // we keep this one separete as it needs upload function
app.post("/posts", verifytoken, upload.single("picture"), createPost);

app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

/* Mongoose setup*/
const PORT = process.env.PORT || 6001;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //SEEDER
    // User.insertMany(users);
    // Post.insertMany(posts);

    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
