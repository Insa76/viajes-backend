import { ComentModel } from "../models/Coment.js";
import { PostModel } from "../models/Post.js";
import { isAuthor } from "./post.controller.js";

export const ctrlCreateComent = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: "User is not the post author" });
  }

  try {
    const coment = new ComentModel({
      ...req.body,
      post: postId,
    });

    await coment.save();

    await PostModel.findOneAndUpdate(
      { _id: postId },
      { $push: { coments: coment._id } }
    );

    res.status(201).json(coment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't create coment" });
  }
};

export const ctrlListComents = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: "User is not the post author" });
  }

  try {
    const coments = await ComentModel.find({ post: postId }, ["-__v"]).populate(
      "post",
      ["-coments", "-author", "-__v"]
    );

    res.status(200).json(coments);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get coments" });
  }
};

export const ctrlGetComentById = async (req, res) => {
  const { comentId, postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: "User is not the post author" });
  }

  try {
    const coment = await ComentModel.findOne({
      _id: comentId,
      post: postId,
    }).populate("post");

    if (!coment)
      return res.status(404).json({ error: "Comment doesn't exist" });

    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get comment" });
  }
};

export const ctrlUpdateComent = async (req, res) => {
  const { comentId, postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: "User is not the post author" });
  }

  try {
    const coment = await ComentModel.findOne({ _id: comentId });

    if (!coment) {
      return res.status(404).json({ error: "Comment doesn't exist" });
    }

    coment.set(req.body);

    await coment.save();

    res.status(200).json(coment);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update comment" });
  }
};

export const ctrlDeleteComent = async (req, res) => {
  const { comentId, postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: "User is not the post author" });
  }

  try {
    await ComentModel.findOneAndDelete({ _id: comentId, post: postId });

    await PostModel.findOneAndUpdate(
      { _id: postId },
      { $pull: { coments: comentId } }
    );

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete comment" });
  }
};
