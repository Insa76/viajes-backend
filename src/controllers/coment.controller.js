import { ComentModel } from "../models/Coment.js";
import { PostsModel } from "../models/Post.js";
import { isAuthor } from "./post.controller.js";

export const ctrlCreateComent = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: "User is not the playlist author" });
  }

  try {
    const coment = new ComentModel({
      ...req.body,
      post: postId,
    });

    await coment.save();

    await PostsModel.findOneAndUpdate(
      { _id: postId },
      { $push: { coments: coment._id } }
    );

    res.status(201).json(coment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't create music" });
  }
};

export const ctrlListComents = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: "User is not the playlist author" });
  }

  try {
    const coments = await ComentModel.find({ post: postId }, ["-__v"]).populate(
      "post",
      ["-musics", "-author", "-__v"]
    );

    res.status(200).json(musics);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get musics" });
  }
};

export const ctrlGetComentById = async (req, res) => {
  const { comentId, postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: "User is not the playlist author" });
  }

  try {
    const coment = await ComentModel.findOne({
      _id: comentId,
      post: postId,
    }).populate("post");

    if (!coment) return res.status(404).json({ error: "Music doesn't exist" });

    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ error: "Couldn't get music" });
  }
};

export const ctrlUpdateComent = async (req, res) => {
  const { comentId, postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: "User is not the playlist author" });
  }

  try {
    const coment = await ComentModel.findOne({ _id: comentId });

    if (!coment) {
      return res.status(404).json({ error: "Music doesn't exist" });
    }

    coment.set(req.body);

    await coment.save();

    res.status(200).json(coment);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update music" });
  }
};

export const ctrlDeleteComent = async (req, res) => {
  const { comentId, postId } = req.params;
  const userId = req.user._id;

  const isPostAuthor = await isAuthor({ postId, userId });

  if (!isPostAuthor) {
    return res.status(403).json({ error: "User is not the playlist author" });
  }

  try {
    await ComentModel.findOneAndDelete({ _id: comentId, post: postId });

    await PostsModel.findOneAndUpdate(
      { _id: postId },
      { $pull: { coments: comentId } }
    );

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete music" });
  }
};
