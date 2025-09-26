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


  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionProducto;
