import { Router } from "express";
import productoRoutes from "./productos.routes.js";
import usuarioRoutes from "./usuario.routes.js"

const router = Router()

router.use("/productos", productoRoutes)

router.use("/usuarios", usuarioRoutes)

export default router;