import { Router } from "express";
import { actualizarUsuario, borrarUsuario, crearUsuario, obtenerUsuarioPorId, obtenerUsuarios } from "../controllers/usuario.controllers.js";
//import validacionUsuario from "../middleware/validarUsuario.js";

const router = Router();
router.route("/").get(obtenerUsuarios).post(crearUsuario);
//router.route("/login").post(login)
router.route("/:id").get(obtenerUsuarioPorId).delete(borrarUsuario).put(actualizarUsuario)

export default router;
