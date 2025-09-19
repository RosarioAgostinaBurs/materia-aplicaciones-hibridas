import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mySchema = new Schema({
    nombre: String,
    email: String,
    contrasena: String
});

const model = mongoose.model('users', mySchema);

export default model;