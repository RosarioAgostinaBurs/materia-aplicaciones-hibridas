import UserModel from '../models/userModel.js';
import Respuesta from '../classes/Respuesta.js';


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

            const user = new UserModel({nombre, email, contrasena});
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
}

export default UserController;