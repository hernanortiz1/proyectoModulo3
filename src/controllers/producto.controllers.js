import subirImagenACloudinary from "../helpers/cloudinaryUploader.js";
import Producto from "../models/producto.models.js";

export const crearProducto = async (req, res) => {
  try {
    let imagenUrl = "";
    if (req.file) {
      const resultado = await subirImagenACloudinary(req.file.buffer);
      imagenUrl = resultado.secure_url;
    } else {
      imagenUrl =
        "https://images.pexels.com/photos/33804151/pexels-photo-33804151.jpeg";
    }

    const nuevoProducto = new Producto({
      ...req.body,
      imagen: imagenUrl,
    });

    await nuevoProducto.save();

    res.status(201).json({ mensaje: "Producto creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const obtenerProductos = async (_req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const obtenerProductoPorId = async (req, res) => {
  try {
    const buscarProducto = await Producto.findById(req.params.id);
    if (!buscarProducto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(buscarProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const productosPaginados = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    const filtro = search
      ? { nombreProducto: { $regex: search, $options: "i" } } 
      : {};

    const [productos, total] = await Promise.all([
      Producto.find(filtro).skip(skip).limit(limit),
      Producto.countDocuments(filtro),
    ]);

    res.status(200).json({
      productos,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener productos paginados" });
  }
}
