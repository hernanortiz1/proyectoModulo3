import { Router } from "express";
import {
  obtenerConfiguracion,
  guardarConfiguracion,
} from "../controllers/categoriaDestacada.controllers.js";
import verificarToken from "../middlewares/verificarToken.js";
import verificarRoles from "../middlewares/verificarRoles.js";

const router = Router();

router.get("/", obtenerConfiguracion);
router.post(
  "/",
  [verificarToken, verificarRoles("Administrador", "Gerente")],
  guardarConfiguracion
);

export default router;
