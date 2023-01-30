import Post from "../models/Post.js";
import User from "../models/User.js";

// createPost actually gets an image sent to it, which is handled by the middleware
export const createPost = async (res, req) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId); // user info will be stored in Post entry

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    // find all posts
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(403).json({ msg: error.message });
  }
};

// READ endpoints

export const getFeedPosts = async (res, req) => {
  try {
    // find all posts
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getUserPosts = async (res, req) => {
  try {
    // find all posts
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

//UPDATE
export const likePost = async (res, req) => {
  try {
    // find all posts
    const { id } = req.params;

    const { userId } = req.body;
    const post = await Post.findById({ id });

    const isLiked = post.likes.get(userId); // get userid from likes map

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // find post whose likes we've updated. Update changes
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost); // Sending back updated post so front end is updated
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
