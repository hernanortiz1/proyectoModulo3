import { body } from "express-validator";

const validacionUsuario = [
  body("nombreUsuario")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),
];
