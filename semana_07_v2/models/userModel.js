import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mySchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    contrasena: String
});

const model = mongoose.model('users', mySchema);

export default model;