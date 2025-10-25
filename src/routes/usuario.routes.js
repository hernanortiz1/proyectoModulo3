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
import verificarToken from "../middlewares/verificarToken.js";
import verificarRoles from "../middlewares/verificarRoles.js";
const router = Router();
router
  .route("/")
  .get(
    [verificarToken, verificarRoles("Administrador", "Gerente")],
    obtenerUsuarios
  )
  .post(validacionUsuario, crearUsuario);
router.route("/paginacion").get(usuariosPaginados);
router.route("/admin/crear").post(
  [verificarToken, verificarRoles("Administrador"), validacionUsuario],
  crearUsuario
);
router
  .route("/:id")
  .get(
    [verificarToken, verificarRoles("Administrador", "Gerente")],
    obtenerUsuarioPorId
  )
  .delete(
    [verificarToken, verificarRoles("Administrador", "Gerente")],
    borrarUsuario
  )
  .put(
    [verificarToken, verificarRoles("Administrador", "Gerente")],
    validacionUsuario,
    actualizarUsuario
  );

router.route("/login").post(login);

export default router;
