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

comentRouter.post("/:playlistId/", createComentValidations, ctrlCreateComent);
comentRouter.get("/:playlistId/", listComentValidations, ctrlListComents);

comentRouter.get(
  "/:playlistId/:musicId",
  getComentValidations,
  ctrlGetComentById
);
comentRouter.patch(
  "/:playlistId/:musicId",
  updateComentValidations,
  ctrlUpdateComent
);
comentRouter.delete(
  "/:playlistId/:musicId",
  deleteComentValidations,
  ctrlDeleteComent
);

export { comentRouter };
