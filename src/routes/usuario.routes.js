import { Router } from "express";
import {
  actualizarUsuario,
  borrarUsuario,
  crearUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios,
  login,
  usuariosPaginados,
} from "../controllers/usuario.controllers.js";
import validacionUsuario from "../middlewares/validacionUsuario.js";
const router = Router();
router.route("/").get(obtenerUsuarios).post(validacionUsuario, crearUsuario);
router.route("/paginacion").get(usuariosPaginados);
router
  .route("/:id")
  .get(obtenerUsuarioPorId)
  .delete(borrarUsuario)
  .put(validacionUsuario, actualizarUsuario);
router.route("/login").post(login);

export default router;
