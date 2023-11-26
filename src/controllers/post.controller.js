import { PostsModel } from "../models/Post.js";
import { ComentModel } from "../models/Coment.js";

export const ctrlCreatePost = async (req, res) => {
  const userId = req.user._id;

  try {
    const { title } = req.body;

    const post = new PostsModel({
      title,
      author: userId,
    });

    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlListPosts = async (req, res) => {
  const userId = req.user._id;

  try {
    const posts = await PostsModel.find({ author: userId })
      .populate("author", ["username", "avatar"])
      .populate("musics", ["name", "artist", "year"]);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlGetPost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostsModel.findOne({
      _id: postId,
      author: userId,
    })
      .populate("author", ["username", "avatar"])
      .populate("musics", ["name", "artist", "year"]);

    if (!post) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlUpdatePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostsModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    post.set(req.body);

    await post.save();

    return res.status(200).json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const ctrlDeletePost = async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  try {
    const post = await PostsModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    await ComentModel.deleteMany({ _id: { $in: post.musics } });

    await PostsModel.findOneAndDelete({
      _id: postId,
      author: userId,
    });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const isAuthor = async ({ postId, userId }) => {
  try {
    const post = await PostsModel.findOne({
      _id: postId,
      author: userId,
    });

    if (!post) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
