import { Router } from "express";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductoPorId,
  obtenerProductos,
  productosPaginados,
} from "../controllers/producto.controllers.js";
import validacionProducto from "../middlewares/validarProducto.js";
import verificarToken from "../middlewares/verificarToken.js";

const router = Router();

router
  .route("/")
  .get(obtenerProductos)
  .post([verificarToken, validacionProducto], crearProducto);
  router.route("/paginacion").get(productosPaginados)
router
  .route("/:id")
  .get(obtenerProductoPorId)
  .delete(eliminarProducto)
  .put([verificarToken, validacionProducto], actualizarProducto);

export default router;
