import { body } from "express-validator";
import Usuario from "../models/usuario.models.js";

const validacionUsuario = [
  body("nombreUsuario")
    .notEmpty()
    .withMessage("El nombre de usuario es un dato obligatorio")
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
  body("password")
    .notEmpty()
    .withMessage("La contraseña del usuario es un dato obligatorio")
    .isLength({ min: 8, max: 16 })
    .withMessage("La contraseña del usuario debe tener entre 8 y 16 caracteres")
    .matches(
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
    )
    .withMessage(
      "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."
    ),
  body("email")
    .notEmpty()
    .withMessage("El correo electrónico del usuario es un dato obligatorio")
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "El correo electrónico del usuario debe tener entre 5 y 100 caracteres"
    )
    .isEmail()
    .withMessage(
      "El correo electrónico debe tener un formato válido, por ejemplo juan2025@mail.com"
    )
    .custom(async (valor, { req }) => {
      const usuarioExistente = await Usuario.findOne({ email: valor });
      if (!usuarioExistente) {
        return true;
      }
      if (req.params?.id && usuarioExistente._id.toString() === req.params.id) {
        return true;
      }
      throw new Error("Ya existe un usuario con este email");
    }),
];

export default validacionUsuario;
