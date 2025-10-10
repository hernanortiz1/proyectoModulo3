import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
  try {
    const token = req.headers["x-token"];

    if (!token) {
      return res
        .status(401)
        .json({ mensaje: "No se envió el token en la solicitud" });
    }

    const payload = jwt.verify(token, process.env.SECRET_JWT);

    req.nombreUsuario = payload.nombreUsuario;
    req.email = payload.email;
    req.rol = payload.rol;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ mensaje: "Token inválido", error: error.message });
  }
};

export default verificarToken;
