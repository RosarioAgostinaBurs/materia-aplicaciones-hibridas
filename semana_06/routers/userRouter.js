import express from 'express';
import {getUser, postUser, getUserId, deleteUser, updateUser, auth} from '../controllers/userController.js';

const rutas = express.Router();

rutas.post('/auth', auth); // Ruta de autenticación.
rutas.get('/', getUser);
rutas.get('/:id', getUserId);
rutas.post('/', postUser);
rutas.delete('/:id', deleteUser);
rutas.put('/:id', updateUser);

export default rutas;