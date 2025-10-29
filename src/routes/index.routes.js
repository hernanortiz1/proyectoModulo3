import { Router } from "express";
import productoRoutes from "./productos.routes.js";
import usuarioRoutes from "./usuario.routes.js"
import pagosRouter from "./pagos.routes.js"

const router = Router()

router.use("/productos", productoRoutes)

router.use("/usuarios", usuarioRoutes)

router.use('/pagos', pagosRouter)

export default router;