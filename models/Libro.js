import mongoose from "mongoose";

const libroSchema = mongoose.Schema({
    isbn: {
        type: Number,
        unique: true
    },
    titulo: {
        type: String,
        require: true
    },
    subtitulo: {
        type: String
    },
    autor: {
        type: Array
    },
    categoria: {
        type: Array
    },
    fecha_publicacion: {
        type: Date
    },
    editor: {
        type: String
    },
    descripcion: {
        type: String
    },
    imagen: {
        type: String
    }

},
{
    timestamps: true,
})

const Libro = mongoose.model("Libro", libroSchema)

export default Libro;