import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema({
  nombreProducto: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 100,
    unique: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 100,
    max: 1000000,
  },
  categoria: {
    type: String,
    required: true,
    enum: [
      "Remeras y chombas",
      "Abrigos y camperas",
      "Sweaters y buzos",
      "Camisas",
      "Bermudas",
      "Pantalones",
      "Shorts de Baño",
      "Anteojos de sol",
      "Gorras",
    ],
  },
  stock: {
    type: Number,
    required: true,
    min: 1,
    max: 5000,
  },
  descripcion: {
    type: String,
    required: true,
    minLenght: 10,
    maxLenght: 500,
  },
  fechaUltimoControlStock: {
    type: Date,
    required: true,
    validate: {
      validator: function (valor) {
        return valor <= new Date();
      },
      message: "La fecha de control no puede ser futura",
    },
  },
  imagen: {
    type: String,
    required: true,
    validate: (valor) => {
      return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/.test(
        valor
      );
    },
  },
  talle: {
    type: String,
    required: true,
    enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "Único"],
  },
  color: {
    type: String,
    required: true,
    minLenght: 1,
    maxLenght: 20,
  },
});
const Producto = mongoose.model("producto", productoSchema);

export default Producto;
