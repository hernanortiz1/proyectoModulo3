import CategoriaDestacada from "../models/categoriaDestacada.models";

export const obtenerConfiguracion = async (req, res) => {
  try {
    const config = await CategoriaDestacada.findOne();
    res.status(200).json(config || { titulo: "", categoriasSeleccionadas: [] });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener configuración", error });
  }
};

// Crear, actualizar
export const guardarConfiguracion = async (req, res) => {
  try {
    const { titulo, categoriasSeleccionadas } = req.body;

    let config = await CategoriaDestacada.findOne();

    if (config) {
      config.titulo = titulo;
      config.categoriasSeleccionadas = categoriasSeleccionadas;
      await config.save();
    } else {
      config = new CategoriaDestacada({ titulo, categoriasSeleccionadas });
      await config.save();
    }

    res
      .status(200)
      .json({ mensaje: "Configuración guardada correctamente", config });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al guardar configuración", error });
  }
};
