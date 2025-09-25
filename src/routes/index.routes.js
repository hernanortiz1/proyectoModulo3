import { Router } from "express";
import productoRoutes from "./productos.routes.js";

const router = Router()

router.use("/productos", productoRoutes)

export default router;