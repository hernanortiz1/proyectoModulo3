import { Router } from "express";
import productoRoutes from "./productos.routes.js";
import usuarioRoutes from "./usuario.routes.js"
import categoriaDestacada from "./categoriaDestacada.routes.js";
import pagosRouter from "./pagos.routes.js"

const router = Router()

router.use("/productos", productoRoutes)

router.use("/usuarios", usuarioRoutes)

router.use("/categoria-destacada", categoriaDestacada); 
router.use("/pagos", pagosRouter)

export default router;