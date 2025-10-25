import { Router } from "express";
import {
  actualizarProducto,
  comprarProducto,
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
import verificarRoles from "../middlewares/verificarRoles.js";
const router = Router();

router
  .route("/")
  .get(obtenerProductos)
  .post(
    [
      verificarToken,
      verificarRoles("Administrador", "Gerente", "Vendedor"),
      upload.single("imagen"),
      errorMulter,
      validacionProducto,
    ],
    crearProducto
  );
router.route("/paginacion").get(productosPaginados);
router
  .route("/:id")
  .get(obtenerProductoPorId)
  .delete(
    [verificarToken, verificarRoles("Administrador", "Gerente", "Vendedor")],
    eliminarProducto
  )
  .put(
    [verificarToken, verificarRoles("Administrador", "Gerente", "Vendedor"), validacionProducto],
    actualizarProducto
  );
router.route("/:id/comprar").post(comprarProducto);

export default router;
