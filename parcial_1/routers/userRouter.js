import express from 'express';
import UserController from '../controllers/userController.js';

const rutas = express.Router();

rutas.get('/', UserController.getAllUsers);
rutas.get('/:id', UserController.getUserId);
rutas.post('/', UserController.postUser);
rutas.delete('/:id', UserController.deleteUser);
rutas.put('/:id', UserController.updateUser);

export default rutas;