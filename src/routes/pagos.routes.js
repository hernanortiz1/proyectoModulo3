import { Router } from "express";
import { crearOrdenCarrito, crearOrdenIndividual, recibirWebhook, verificarEstadoPedido } from "../controllers/pagos.controllers.js";

const router = Router();

router.route('/crear-orden-carrito').post(crearOrdenCarrito);
router.route('/webhook').post(recibirWebhook)
router.get("/estado/:pedidoId", verificarEstadoPedido);
router.route('/crear-orden-individual').post(crearOrdenIndividual);

export default router;