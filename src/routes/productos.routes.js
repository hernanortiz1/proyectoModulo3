import { Router } from "express";
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductoPorId, obtenerProductos, productosPaginados } from "../controllers/producto.controllers.js";

const router = Router();

router.route("/").get(obtenerProductos).post(crearProducto)
router.route("/paginacion").get(productosPaginados)
router.route("/:id").get(obtenerProductoPorId).delete(eliminarProducto).put(actualizarProducto)

export default router;