import mongoose, { Schema } from "mongoose";

const categoriaDestacadaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  categoriasSeleccionadas: {
    type: [String],
    default: [],
  },
});

const CategoriaDestacada = mongoose.model("CategoriaDestacada", categoriaDestacadaSchema);
export default CategoriaDestacada;
