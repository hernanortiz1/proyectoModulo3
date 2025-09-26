import { body } from "express-validator";
import Usuario from "../models/usuario.models.js";

const validacionUsuario = [
  body("nombreUsuario")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre del usuario debe tener entre 3 y 100 caracteres")
    .custom(async (valor, { req }) => {
      const usuarioExistente = await Usuario.findOne({ nombreUsuario: valor });
      if (!usuarioExistente) {
        return true;
      }
      if (req.params?.id && usuarioExistente._id.toString() === req.params.id) {
        return true;
      }
      throw new Error("Ya existe un usuario con este nombre");
    }),
];
