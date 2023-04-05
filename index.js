import express from "express";
import dotenv from "dotenv"
import conectarDB from "./config/db.js";
import libroRoutes from './routes/libroRoutes.js'

const app = express();
app.use(express.json()); // Procesamos la informacion de tipo json

dotenv.config();

conectarDB();

// Routing
app.use("/api/libro", libroRoutes) 

const PORT= process.env_PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})