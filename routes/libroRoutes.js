import express from "express";
import { ConsultaryRegistrar, eliminarLibro } from '../controllers/libroController.js'

const router = express.Router();

router

//
router.post('/', ConsultaryRegistrar);
router.delete('/:id', eliminarLibro);


export default router;