import express from 'express';
import BebidaController from '../controllers/bebidaController.js';

const rutas = express.Router();

rutas.get('/', BebidaController.getAllBebidas);
rutas.get('/:id', BebidaController.getBebidaId);
rutas.post('/', BebidaController.postBebida);
rutas.delete('/:id', BebidaController.deleteBebida);
rutas.put('/:id', BebidaController.updateBebida);

export default rutas;