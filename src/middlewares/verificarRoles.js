const verificarRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
  try {
    if (!req.rol) {
      return res.status(401).json({
        mensaje: "No auntenticado"
      });
    }
    if (!rolesPermitidos.includes(re.rol)){
      return res.status(403).json({
        mensaje: "No tienes permisos para realizar esta acción"
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al verificar permisos" });
  }
}
};

export default verificarRoles;
