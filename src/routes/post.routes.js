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
postsRouter.post("/upload", createPostValidations, ctrlCreatePost);
postsRouter.get("/", listPostValidations, ctrlListPosts);

postsRouter.get("/:postId", getPostValidations, ctrlGetPost);
postsRouter.patch("/:postId", updatePostValidations, ctrlUpdatePost);
postsRouter.delete("/:postId", deletePostValidations, ctrlDeletePost);

export { postsRouter };
