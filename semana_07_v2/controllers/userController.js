import UserModel from '../models/userModel.js';
import Respuesta from '../classes/Respuesta.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const salt = 10;

class UserController {

    static async getAllUsers(req, res)
    {
        try {
            const users = await UserModel.find();
            return Respuesta.success(res, 200, 'Usuarios obtenidos:', users);
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 500, 'No se pudo obtener los usuarios');
        }
    }

    static async getUserId(req, res)
    {
        try {
            const {id} = req.params;
            const user = await UserModel.findById(id);

            if(user) {
                return Respuesta.success(res, 200, 'Usuario obtenido por id:', user);
            } else {
                return Respuesta.error(res, 404, 'Usuario no encontrado');
            }
        } catch(error) {
            console.error(error);
            return Respuesta.error(res, 500, 'Error en el servidor');
        }
    }

    static async postUser(req, res)
    {
        try {
            const {nombre, email, contrasena} = req.body;
            if(!nombre || !email || !contrasena){
                return Respuesta.error(res, 400, 'Faltan campos');
            }

            const hash = await bcrypt.hash(contrasena, salt);

            const user = new UserModel({nombre, email, contrasena: hash});
            const data = await user.save();

            return Respuesta.success(res, 201, 'Usuario cargado', data);
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 500, 'No se pudo guardar el usuario');
        }
    }

    static async deleteUser(req, res)
    {
        try {
            const {id} = req.params;
            const user = await UserModel.findByIdAndDelete(id);
            if(user) {
                return Respuesta.success(res, 200, 'Usuario eliminado', user);
            } else {
                return Respuesta.error(res, 404, 'Usuario no encontrado');
            }
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 500, 'Error al eliminar el usuario');
        }
    }

    static async updateUser(req, res)
    {
        try {
            const {id} = req.params;
            const {nombre, contrasena} = req.body;
            
            if(!nombre || !contrasena){
                return Respuesta.error(res, 400, 'Faltan campos');
            }

            const user = await UserModel.findByIdAndUpdate(id, {nombre, contrasena}); 
            return Respuesta.success(res, 200, 'Usuario actualizado', user);
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 500, 'Error en el servidor');
        }
    }

    static async auth(req, res)
    {
        try {
            const { email, contrasena } = req.body;

            if (!email || !contrasena) {
                return Respuesta.error(res, 400, 'Faltan campos');
            }

            const emailString = email.trim();

            const userDatos = await UserModel.findOne({ email: emailString });
            if (!userDatos) {
                return Respuesta.error(res, 404, 'El email no existe');
            }

            const isContrasenaValida = await bcrypt.compare(contrasena, userDatos.contrasena);
            if (!isContrasenaValida) {
                return Respuesta.error(res, 401, 'Contraseña inválida');
            }

            const payload = {
                id: userDatos._id,
                email: userDatos.email
            };

            const jwt = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: '2h' });

            console.log('JWT generado:', jwt);

            return Respuesta.success(res, 200, 'Credenciales correctas', {
                usuario: {
                    id: userDatos._id,
                    nombre: userDatos.nombre,
                    email: userDatos.email
                },
                jwt
            });

        } catch (error) {
            console.error('Error en auth:', error);
            return Respuesta.error(res, 500, 'Error en el servidor');
        }
    }
}

export default UserController;