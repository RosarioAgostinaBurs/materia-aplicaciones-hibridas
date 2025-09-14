import mongoose from 'mongoose';

const Schema = mongoose.Schema; // Traigo para usar el objeto Schema de mongoose.

/* Acá armo el plano o plantilla que define la estructura de los documentos
Por ejemplo, los campos tiene un usuario, qué tipo de datos son y si son obligatorios.
## Define la forma de los datos. */
const mySchema = new Schema({
    nombre: String,
    email: String,
    contrasena: String
});

/* Model devuelve un objeto que permite crear, leer, actualizar y borrar documentos en la colección users.
## Es la puerta de entrada para interactuar con la colección en MongoDB. */
const model = mongoose.model('users', mySchema);

export default model; // Exporto desde el modelo e importo desde el controlador.