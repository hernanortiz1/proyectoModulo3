import { Router } from "express";
import { crearOrdenCarrito, recibirWebhook, verificarEstadoPedido } from "../controllers/pagos.controllers.js";

const router = Router();

router.route('/crear-orden-carrito').post(crearOrdenCarrito);
router.route('/webhook').post(recibirWebhook)
router.get("/estado/:pedidoId", verificarEstadoPedido);

export default router;