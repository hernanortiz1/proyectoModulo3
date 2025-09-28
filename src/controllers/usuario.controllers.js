import Usuario from "../models/usuario.models.js";
import bcrypt from "bcrypt";

export const crearUsuario = async (req, res) => {
  try {
    const { password, email, nombreUsuario, rol } = req.body;
    const saltos = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, saltos);
    const nuevoUser = new Usuario({
      nombreUsuario,
      email,
      password: passwordHash,
      rol,
    });
    await nuevoUser.save();
    res.status(201).json({ mensaje: "El usuario fue creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear usuario" });
  }
};

export const obtenerUsuarios = async (_req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener los usuarios" });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const buscarUser = await Usuario.findById(req.params.id);
    if (!buscarUser) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).json(buscarUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener el usuario" });
  }
}

export const borrarUsuario = async (req, res) => {
  try {
    const eliminarUser = await Usuario.findByIdAndDelete(req.params.id);
    if (!eliminarUser) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar usuario" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const editarUser = await Usuario.findByIdAndUpdate(req.params.id, req.body);
    if (!editarUser) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.status(200).json({ mensaje: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar usuario" });
  }
};
