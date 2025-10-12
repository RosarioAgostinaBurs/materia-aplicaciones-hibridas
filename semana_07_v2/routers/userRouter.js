import express from 'express';
import UserController from '../controllers/userController.js';

const rutas = express.Router();

import {validarToken} from "../middlewares/auth.js";

rutas.post('/auth', UserController.auth);
rutas.get('/', UserController.getAllUsers);
rutas.get('/:id', validarToken, UserController.getUserId);
rutas.post('/', UserController.postUser);
rutas.delete('/:id', validarToken, UserController.deleteUser);
rutas.put('/:id', validarToken, UserController.updateUser);

export default rutas;