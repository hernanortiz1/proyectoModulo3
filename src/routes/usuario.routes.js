import { Router } from "express";
import {
  actualizarUsuario,
  borrarUsuario,
  crearUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarios,
} from "../controllers/usuario.controllers.js";
import validacionUsuario from "../middelware/validacionUsuario.js";

const router = Router();
router.route("/").get(obtenerUsuarios).post(validacionUsuario, crearUsuario);
router
  .route("/:id")
  .get(obtenerUsuarioPorId)
  .delete(borrarUsuario)
  .put(validacionUsuario, actualizarUsuario);
//router.route("/login").post(login)

export default router;
