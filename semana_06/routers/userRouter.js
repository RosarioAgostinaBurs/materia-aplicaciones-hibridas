import express from 'express';
import {getUser, postUser, getUserId, deleteUser, updateUser, auth} from '../controllers/userController.js';

const rutas = express.Router();

// Importo la función que cree para validar el token.
import {validarToken} from "../middlewares/auth.js";

rutas.post('/auth', auth); // Ruta de autenticación.
rutas.get('/', getUser);
rutas.get('/:id', getUserId);
rutas.post('/', postUser);
rutas.delete('/:id', validarToken, deleteUser);
rutas.put('/:id', validarToken, updateUser); // Cada vez que yo quiera actualizar un usuario va a llamar a esa función.

export default rutas;