import { body, param } from "express-validator";
import { isValidObjectId } from "mongoose";
import { applyValidations } from "../../middlewares/apply-validations.js";

export const createComentValidations = [
  param("postId")
    .notEmpty()
    .withMessage("El parametro { postId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { postId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro { postId } debe ser una id valida."),
  body("name")
    .notEmpty()
    .withMessage("El campo { name } no debe estar vacio.")
    .isString()
    .withMessage("El campo { name } debe ser un string."),
  body("description")
    .notEmpty()
    .withMessage("El campo { description } no debe estar vacio.")
    .isString()
    .withMessage("El campo { description } debe ser un string."),
  body("year")
    .optional()
    .isNumeric()
    .withMessage("El campo { year } debe ser un año válido."),
  applyValidations,
];

export const listComentValidations = [
  param("postId")
    .notEmpty()
    .withMessage("El parametro { postId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { postId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro { postId } debe ser una id valida."),
  applyValidations,
];

export const deleteComentValidations = [
  param("postId")
    .notEmpty()
    .withMessage("El parametro { postId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { postId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro { postId } debe ser una id valida."),
  param("comentId")
    .notEmpty()
    .withMessage("El parametro { comentId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { comentId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro { comentId } debe ser una id valida."),
  applyValidations,
];

export const getComentValidations = [
  param("postId")
    .notEmpty()
    .withMessage("El parametro { postId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { postId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro { postId } debe ser una id valida."),
  param("comentId")
    .notEmpty()
    .withMessage("El parametro { comentId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { comentId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro { comentId } debe ser una id valida."),
  applyValidations,
];

export const updateComentValidations = [
  param("postId")
    .notEmpty()
    .withMessage("El parametro { postId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { postId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro { postId } debe ser una id valida."),
  param("comentId")
    .notEmpty()
    .withMessage("El parametro { comentId } no debe estar vacio.")
    .isString()
    .withMessage("El parametro { comentId } debe ser un string.")
    .custom(isValidObjectId)
    .withMessage("El parametro { comentId } debe ser una id valida."),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El campo { name } no debe estar vacio.")
    .isString()
    .withMessage("El campo { name } debe ser un string."),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("El campo { description } no debe estar vacio.")
    .isString()
    .withMessage("El campo { description } debe ser un string."),
  body("year")
    .optional()
    .isNumeric()
    .withMessage("El campo { year } debe ser un año válido.")
    .notEmpty()
    .withMessage("El campo { year } no debe estar vacio."),
  applyValidations,
];
