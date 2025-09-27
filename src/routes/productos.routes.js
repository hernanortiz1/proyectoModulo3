import { Router } from "express";
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductoPorId, obtenerProductos } from "../controllers/producto.controllers.js";
import validacionProducto from "../middelware/validarProducto.js";

const router = Router();

router.route("/").get(obtenerProductos).post([validacionProducto], crearProducto)
router.route("/:id").get(obtenerProductoPorId).delete(eliminarProducto).put([validacionProducto], actualizarProducto)

export default router;