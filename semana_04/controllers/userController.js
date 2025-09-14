import UserModel from '../models/userModel.js'; // Importo el modelo desde el controlador.

const getUser = async (req, res) => {
    try {
        const users = [
            { id:1, nombre: "Ro", email: "ro@gamil.com"},
            { id:2, nombre: "Jose", email: "jose@gamil.com"},
            { id:3, nombre: "María", email: "maria@gamil.com"}
        ];

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

        const user = new UserModel({nombre, email, contrasena}); // Le paso por parámetro los campos.
        const data = await user.save(); // Este es un método de mongoose para guardar en este caso el usuario.

        res.status(201).json({mensaje: 'Usuario cargado', data});

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'No se pudo guardar el usuario'});
    }
}

export {postUser, getUser}