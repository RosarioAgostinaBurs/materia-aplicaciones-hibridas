import UserModel from '../models/userModel.js';

const getUser = async (req, res) => {
    try {
        const users = await UserModel.find(); // Find es un método de mongoose que busca documentos en una colección, trae todos los documentos

        res.status(200).json({mensaje: 'Usuarios', data: users});
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'No se pudo obtener los usuarios'})
    }
}

const postUser = async (req, res) => {
    try {
        const {nombre, email, contrasena} = req.body;
        if(!nombre || !email || !contrasena){
            res.status(400).json({mensaje: 'Faltan campos'});
            return;
        }

        const user = new UserModel({nombre, email, contrasena});
        const data = await user.save();

        res.status(201).json({mensaje: 'Usuario cargado', data});

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'No se pudo guardar el usuario'});
    }
}

const getUserId = async (req, res) => {
    try {
        const {id} = req.params; // Este id esta definido en userRouter. 
        const user = await UserModel.findById(id); // findById(id) es un método de mongoose.

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

        /* Este método findByIdAndUpdate es de mongoose y lo que hace es busca un documento por su _id 
        (que viene de req.params, osea url) en la colección de MongoDB.
        Y también actualiza los campos que se le pasan en el segundo parámetro. En este caso el nombre y la contrasena del usuario encontrado. */
        const user = await UserModel.findByIdAndUpdate(id, {nombre, contrasena}); 
        res.status(200).json({mensaje: 'Usuario actualizado', usuario: user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

export {postUser, getUser, getUserId, deleteUser, updateUser}