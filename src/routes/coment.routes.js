import { Router } from "express";

import {
  ctrlCreateComent,
  ctrlListComents,
  ctrlGetComentById,
  ctrlUpdateComent,
  ctrlDeleteComent,
} from "../controllers/coment.controller.js";

import {
  createComentValidations,
  deleteComentValidations,
  getComentValidations,
  listComentValidations,
  updateComentValidations,
} from "../models/validations/coment-validations.js";

const comentRouter = Router();

comentRouter.post("/:postId/", createComentValidations, ctrlCreateComent);
comentRouter.get("/:postId/", listComentValidations, ctrlListComents);

comentRouter.get("/:postId/:comentId", getComentValidations, ctrlGetComentById);
comentRouter.patch(
  "/:postId/:comentId",
  updateComentValidations,
  ctrlUpdateComent
);
comentRouter.delete(
  "/:postId/:comentId",
  deleteComentValidations,
  ctrlDeleteComent
);

export { comentRouter };
