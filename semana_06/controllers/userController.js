import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt'; // Nueva dependencia para encriptación/hash guarda contraseñas de manera segura.
import jsonwebtoken from 'jsonwebtoken'; // Nueva dependencia.
import dotenv from 'dotenv';

// Uso dotenv para la variable de entorno que necesito para Json Web Token.
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;


const salt = 10; // Declaro el salt 

// Función para la autenticación.
const auth = async (req, res) => {
    try {
        // Verifico que el usuario me envie los campos de email y contraseña
        const {email, contrasena} = req.body;
        if(!email || !contrasena){
            res.status(400).json({mensaje: 'Faltan campos'});
            return;
        }
        
        // Verifico si el email existe o no
        const userDatos = await UserModel.findOne({email});
        if(!userDatos) {
            res.status(404).json({mensaje: 'El email no existe'});
            return;
        }

        // Verificio si la contraseña que paso el usuario matchea con la encriptada.
        const isContrasena = await bcrypt.compare(contrasena, userDatos.contrasena);
        if(!isContrasena) {
            res.status(404).json({mensaje: 'Contraseña inválida'});
            return;
        }

        // Generamos el JWT
        const payload = {
            id: userDatos._id, // El id lo pasamos con _ porque así se crea en la base de datos.
            email: userDatos.email
        }
        //El token se genera con una fecha de expiración.
        const jwt = jsonwebtoken.sign(payload, SECRET_KEY, {expiresIn: '2h'});

        res.status(200).json({mensaje: 'Credenciales correctas', jwt});

    } catch (error) {
        res.status(500).json({mensaje: 'Error en el servidor'});
    }
}

const getUser = async (req, res) => {
    try {
        const users = await UserModel.find();

        res.status(200).json({mensaje: 'Usuarios', data: users});
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'No se pudo obtener los usuarios'});
    }
}

const postUser = async (req, res) => {
    try {
        const {nombre, email, contrasena, userId} = req.body;
        if(!nombre || !email || !contrasena){
            res.status(400).json({mensaje: 'Faltan campos'});
            return;
        }

        // Validación para no dejar que un usuario se registre dos veces con el mismo email.
        const userDatos = await UserModel.findOne({email});
        if(userDatos) {
            res.status(400).json({mensaje: 'El email ya esta registrado'});
            return;
        }
        console.log('El usuario actualizado es', userId);

        /* Indico en el parámetro que campo es el que quiero hashear y le paso el salt */
        const hash = await bcrypt.hash(contrasena, salt);

        // Al momento de crear la nueva instancia de UserModel ya le paso la contraseña hasheada.
        const user = new UserModel({nombre, email, contrasena:hash});
        const data = await user.save();

        res.status(201).json({mensaje: 'Usuario cargado', data:{id: data._id, nombre: data.nombre}});

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'No se pudo guardar el usuario'});
    }
}

const getUserId = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await UserModel.findById(id);

        if(user) {
            res.status(200).json({mensaje: 'Usuario obtenido por id', usuario: user});
        } else {
            res.status(404).json({mensaje: 'Usuario no encontrado'});
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        if(user) {
            res.status(200).json({mensaje: 'Usuario eliminado', usuario: user});
        } else {
            res.status(404).json({mensaje: 'Usuario no encontrado'});
        }
    } catch (error) {
        console.error(error);
        res.status(200).json({mensaje: 'Error al eliminar el usuario'});
    }
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, contrasena} = req.body;
        
        if(!nombre || !contrasena){
            res.status(400).json({mensaje: 'Faltan campos'});
            return;
        }

        const user = await UserModel.findByIdAndUpdate(id, {nombre, contrasena}); 
        res.status(200).json({mensaje: 'Usuario actualizado', usuario: user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

export {postUser, getUser, getUserId, deleteUser, updateUser, auth}