import express from 'express';
import TragosController from '../controllers/tragosController.js';

const rutas = express.Router();

rutas.get('/', TragosController.getAllTragos);
rutas.get('/:id', TragosController.getTragoId);
rutas.post('/', TragosController.postTrago);
rutas.delete('/:id', TragosController.deleteTrago);
rutas.put('/:id', TragosController.updateTrago);

export default rutas;