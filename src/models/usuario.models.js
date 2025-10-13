import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombreUsuario: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        "Por favor ingresa un email válido",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 100,
    },
    rol: {
      type: String,
      enum: ["Administrador", "Usuario"],
      default: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
