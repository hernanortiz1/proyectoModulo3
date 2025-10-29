import client from "../../server/mercadopago.js";
import { Preference, Payment } from "mercadopago";
import Producto from "../models/producto.models.js";
import Pedido from "../models/pedido.js";

export const crearOrdenCarrito = async (req, res) => {
  try {
    const { productosCarrito } = req.body;

    if (!productosCarrito || productosCarrito.length === 0) {
      return res.status(400).json({ mensaje: "El carrito está vacío" });
    }

    const idsProductos = productosCarrito.map((p) => p.id);
    const productosDB = await Producto.find({ _id: { $in: idsProductos } });

    const productosMap = new Map(productosDB.map((p) => [p._id.toString(), p]));

    let totalPedido = 0;
    const itemsParaMP = [];
    const productosDelPedido = [];

    // Validar stock antes de crear la orden
    for (const itemCarrito of productosCarrito) {
      const productoDB = productosMap.get(itemCarrito.id);
      if (productoDB) {
        // Validar stock disponible
        if (productoDB.stock < itemCarrito.quantity) {
          return res.status(400).json({
            mensaje: `Stock insuficiente para ${productoDB.nombreProducto}. Disponible: ${productoDB.stock}, Solicitado: ${itemCarrito.quantity}`,
          });
        }

        itemsParaMP.push({
          title: productoDB.nombreProducto,
          quantity: itemCarrito.quantity,
          currency_id: "ARS",
          unit_price: productoDB.precio,
        });

        productosDelPedido.push({
          producto: productoDB._id,
          cantidad: itemCarrito.quantity,
        });

        totalPedido += productoDB.precio * itemCarrito.quantity;
      }
    }

    if (itemsParaMP.length === 0) {
      return res.status(404).json({
        mensaje: "Ninguno de los productos del carrito fue encontrado.",
      });
    }

    // Crear el pedido con estado Pendiente
    const nuevoPedido = new Pedido({
      productos: productosDelPedido,
      total: totalPedido,
      estado: "Pendiente",
    });
    await nuevoPedido.save();

    // Configurar preference con webhook
    const preference = {
      items: itemsParaMP,
      back_urls: {
        success: `${
          process.env.FRONTEND_URL || "https://tiendalannister1.netlify.app"
        }/pago/exitoso`,
        failure: `${
          process.env.FRONTEND_URL || "https://tiendalannister1.netlify.app"
        }/pago/fallido`,
        pending: `${
          process.env.FRONTEND_URL || "https://tiendalannister1.netlify.app"
        }/pago/pendiente`,
      },
      notification_url: `${
        process.env.BACKEND_URL || "https://back-tienda-lannister.vercel.app"
      }/api/pagos/webhook`,
      external_reference: nuevoPedido._id.toString(),
    };

    const preferenceClient = new Preference(client);
    const respuesta = await preferenceClient.create({ body: preference });

    res.status(201).json({
      init_point: respuesta.init_point,
      pedidoId: nuevoPedido._id, // Enviar el ID para seguimiento
    });
  } catch (error) {
    console.error("Error al crear la orden de pago del carrito:", error);
    res.status(500).json({
      mensaje: "Ocurrió un error al procesar el pago del carrito",
      error: error.message,
    });
  }
};

export const recibirWebhook = async (req, res) => {
  const notification = req.body;
  console.log("🔔 Webhook recibido:", JSON.stringify(notification, null, 2));
  // ✅ ESTE LOG DEBE APARECER CUANDO HAY UN PAGO
  console.log("🎯 ¿WEBHOOK RECIBIDO?", new Date().toISOString());
  console.log("Body recibido:", req.body);

  try {
    if (notification.type === "payment") {
      const paymentClient = new Payment(client);
      const payment = await paymentClient.get({ id: notification.data.id });

      console.log(`💰 Estado del pago ${payment.id}: ${payment.status}`);

      if (payment && payment.status === "approved") {
        const pedidoId = payment.external_reference;
        console.log(`🎯 Procesando pedido: ${pedidoId}`);

        const pedido = await Pedido.findById(pedidoId).populate(
          "productos.producto"
        );

        if (!pedido) {
          console.error(`❌ Pedido ${pedidoId} no encontrado`);
          return res.sendStatus(404);
        }

        if (pedido.estado === "Pendiente") {
          // 1. Actualizar estado del pedido
          pedido.estado = "Aprobado";
          pedido.paymentId = payment.id;

          // 2. Actualizar stock de productos
          for (const item of pedido.productos) {
            await Producto.findByIdAndUpdate(item.producto._id, {
              $inc: { stock: -item.cantidad },
            });
            console.log(
              `📦 Stock actualizado: ${item.producto.nombreProducto} -${item.cantidad} unidades`
            );
          }

          await pedido.save();
          console.log(
            `✅ Pedido ${pedidoId} actualizado a Aprobado y stock descontado`
          );
        } else {
          console.log(
            `ℹ️ Pedido ${pedidoId} ya procesado. Estado: ${pedido.estado}`
          );
        }
      } else if (
        payment &&
        (payment.status === "rejected" || payment.status === "cancelled")
      ) {
        // Manejar pagos rechazados o cancelados
        const pedidoId = payment.external_reference;
        const pedido = await Pedido.findById(pedidoId);

        if (pedido && pedido.estado === "Pendiente") {
          pedido.estado = "Rechazado";
          await pedido.save();
          console.log(`❌ Pedido ${pedidoId} marcado como Rechazado`);
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(`💥 Error procesando webhook:`, error);
    res.status(500).json({
      mensaje: "Error interno del servidor al procesar el webhook",
      error: error.message,
    });
  }
};

// Endpoint para verificar estado del pedido manualmente (útil para el frontend)
export const verificarEstadoPedido = async (req, res) => {
  try {
    const { pedidoId } = req.params;

    const pedido = await Pedido.findById(pedidoId);

    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }

    res.json({
      estado: pedido.estado,
      paymentId: pedido.paymentId,
      total: pedido.total,
      createdAt: pedido.createdAt,
    });
  } catch (error) {
    console.error("Error al verificar estado del pedido:", error);
    res
      .status(500)
      .json({ mensaje: "Error al verificar el estado del pedido" });
  }
};
