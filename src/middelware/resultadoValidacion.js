import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next) => {
  const errores = validationResult(req);
  //errores.isEmpty() = true todo salio bien, no hay errores en la validacion
  //errores.isEmpty = falso hay errores
  if (!errores.isEmpty()) {
    return res.status(400).json(errores.array());
  }
  next();
};

export default resultadoValidacion;
