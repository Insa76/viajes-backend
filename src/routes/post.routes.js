import { Router } from "express";

import {
  ctrlCreatePost,
  ctrlDeletePost,
  ctrlGetPost,
  ctrlListPosts,
  ctrlUpdatePost,
} from "../controllers/post.controller.js";
import {
  createPostValidations,
  deletePostValidations,
  getPostValidations,
  listPostValidations,
  updatePostValidations,
} from "../models/validations/post-validations.js";

const postsRouter = Router();

postsRouter.post("/", createPostValidations, ctrlCreatePost);
postsRouter.get("/", listPostValidations, ctrlListPosts);

postsRouter.get("/:playlistId", getPostValidations, ctrlGetPost);
postsRouter.patch("/:playlistId", updatePostValidations, ctrlUpdatePost);
postsRouter.delete("/:playlistId", deletePostValidations, ctrlDeletePost);

export { postsRouter };
