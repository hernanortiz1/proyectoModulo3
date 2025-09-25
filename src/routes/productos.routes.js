import { Router } from "express";
import { obtenerProductos, crearProducto, obtenerProductoPorId, eliminarProducto, actualizarProducto } from "../controllers/productos.controllers.js";

const router = Router();

router.route("/").get(obtenerProductos).post(crearProducto)
router.route("/:id").get(obtenerProductoPorId).delete(eliminarProducto).put(actualizarProducto)

export default router;