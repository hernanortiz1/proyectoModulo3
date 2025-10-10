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
import upload from "../middlewares/upload.js";
import errorMulter from "../middlewares/errorMulter.js";
import verificarAdmin from "../middlewares/verificarAdmin.js";
const router = Router();

router
  .route("/")
  .get(obtenerProductos)
  .post(
    [verificarToken,verificarAdmin, upload.single("imagen"), errorMulter, validacionProducto],
    crearProducto
  );
router.route("/paginacion").get(productosPaginados);
router
  .route("/:id")
  .get(obtenerProductoPorId)
  .delete([verificarToken,verificarAdmin],eliminarProducto)
  .put([verificarToken, verificarAdmin,validacionProducto,], actualizarProducto);

export default router;
