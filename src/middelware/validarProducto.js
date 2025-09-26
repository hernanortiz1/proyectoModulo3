import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Producto from "../models/producto.models.js";

const validacionProducto = [
  body("nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre del producto debe tener entre 3 y 100 caracteres")
    .custom(async (valor, { req }) => {
      const productoExistente = await Producto.findOne({
        nombreProducto: valor,
      });
      //No existe ningun producto con el nombre 'valor'
      if (!productoExistente) return true;
      //verificar si es un PUT, chequear si el id del productoExistente es el mismo que el producto que estoy editando
      if (
        req.params?.id &&
        productoExistente._id.toHexString() === req.params.id
      )
        return true;
      throw new Error("Ya existe un producto con ese nombre");
    }),
  body("precio")
    .notEmpty()
    .withMessage("El precio es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un numero")
    .custom((valor) => {
      if (valor >= 100 && valor <= 1000000) {
        return true;
      } else {
        throw new Error("El precio debe estar entre 50 y 1000000");
      }
    }),
  body("categoria")
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isIn([
      "Remeras y chombas",
      "Abrigos y camperas",
      "Sweaters y buzos",
      "Camisas",
      "Bermudas",
      "Pantalones",
      "Shorts de Baño",
      "Anteojos de sol",
      "Gorras",
    ])
    .withMessage(
      "La categoria debe ser una de las siguientes opciones: Remeras y chombas, Abrigos y camperas, Sweaters y buzos, Camisas, Bermudas, Pantalones, Shorts de Baño, Anteojos de sol, Gorras"
    ),
  body("stock")
    .notEmpty()
    .withMessage("Stock es un dato obligatorio")
    .isLength({ min: 1, max: 5000 })
    .withMessage("El stock debe puede tener entre 1 y 500 productos"),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripcion es obligatoria")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripcion debe tener entre 10 y 500 caracteres"),
  body("fechaUltimoControlStock")
    .notEmpty()
    .withMessage("La fecha de control es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe tener un formato válido")
    .custom((value) => {
      const fecha = new Date(value);
      if (fecha > new Date()) {
        throw new Error("La fecha de control no puede ser futura");
      }
      return true;
    }),
  body("talle")
    .notEmpty()
    .withMessage("El talle es un dato obligatorio")
    .isIn(["XS", "S", "M", "L", "XL", "XXL", "XXXL", "Único"])
    .withMessage(
      "El talle debe ser una del as siguientes opciones: XS, S, M, L, XL, XXL, XXXL, Unico"
    ),
  body("color")
    .notEmpty()
    .withMessage("El color es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El color debe tener al menos 3 caracteres")
    .isAlpha()
    .withMessage("El color debe contener solo letras"),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionProducto;
