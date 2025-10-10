const verificarAdmin = (req, res, next) => {
  try {
    if (req.rol !== "Administrador") {
      return res.status(403).json({
        mensaje: "Acceso denegado. Solo administradores pueden realizar esta acción"
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al verificar permisos" });
  }
};

export default verificarAdmin;
