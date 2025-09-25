import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
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
      match: [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, "Por favor ingresa un email válido"],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 100,
      validate: {
        validator: (valor) =>{
          return /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,100}$/.test(valor)
        }
      }
    },
},
 {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
)

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;