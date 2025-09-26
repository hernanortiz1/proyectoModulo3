import { Router } from "express";
// import {} from "../controllers/usuarios.controllers.js"

const router = Router();
router.route("/").get(leerUsuarios).post(validacionUsuario ,crearUsuario);
router.route("/login").post(login)

export default router;
