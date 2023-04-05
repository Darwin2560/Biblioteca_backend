import Libro from "../models/Libro.js"

const ConsultaryRegistrar = async (req, res) => {

    try {
        // Consultamos si el libro existe
        const { isbn } = req.body;
        const libro = await Libro.findOne({ isbn })

        // si existe enviamos una respuesta en JSON
        if (libro) {

            res.json({
                isbn: isbn,
                titulo: libro.titulo,
                autor: libro.autor,
                categoria: libro.categoria,
                fecha_publicacion: libro.fecha_publicacion,
                descripcion: libro.descripcion,
                imagen: libro.imagen,
                fuente: "db interna"
            })
        // Si no existe hacemos una busqueda en la api de google books
        } else { 

            const respuesta = await fetch(`${process.env.API_GOOGLE_BOOKS}:${isbn}`)
            const data = await respuesta.json()
            const { title, authors , categories, publishedDate, description} = data.items[0].volumeInfo
            // res.json(data.items[0].volumeInfo)

            // Guardamso la informacion en la db interna
            const libro = new Libro()
            libro.isbn = data.items[0].volumeInfo.industryIdentifiers[1].identifier;
            libro.titulo = title;
            libro.autor = authors;
            libro.categoria = categories;
            libro.fecha_publicacion = publishedDate;
            libro.descripcion = description;
            libro.imagen = data.items[0].volumeInfo.imageLinks.thumbnail
            libro.fuente = "google"
            const libroAlmacenado = await libro.save();
            res.json({
                isbn: libroAlmacenado.isbn,
                titulo: libroAlmacenado.titulo,
                autor: libroAlmacenado.autor,
                categoria: libroAlmacenado.categoria,
                fecha_publicacion: libroAlmacenado.fecha_publicacion,
                descripcion: libroAlmacenado.descripcion,
                imagen: libroAlmacenado.imagen,
                fuente: "Google"
            })
        }

    } catch (error) {
        console.log(error)
    } 
}

const eliminarLibro = async (req, res) => {
    const { id } = req.params;

    const libro = await Libro.findById(id);

    if (!libro) {
        const error = new Error("No Encontrado");
        return res.status(404).json({msg: error.message});
    }

    try {
        await libro.deleteOne();
        res.json({msg: 'Libro Eliminado'})
    } catch (error) {
        console.log(error)
    }
}

export {
    ConsultaryRegistrar,
    eliminarLibro
}