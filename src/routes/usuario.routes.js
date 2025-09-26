import { Router } from "express";
import {crearUsuario, obtenerUsuarios, borrarUsuario, actualizarUsuario } from "../controllers/usuarios.controllers.js"
//import validacionUsuario from "../middleware/validarUsuario.js";

const router = Router();
router.route("/").get(obtenerUsuarios).post(crearUsuario);
//router.route("/login").post(login)
router.route("/:id").get(obtenerUsuarios).delete(borrarUsuario).put(actualizarUsuario)

export default router;
