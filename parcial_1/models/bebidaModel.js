import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mySchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    marca: {
        type: String,
        trim: true
    },
    origen: {
        type: String,
        trim: true
    },
    tipo: {
        type: String,
        trim: true,
        required: true
    },
    graduacion: {
        type: Number,
        min: 0,
        max: 100
    }
});

const model = mongoose.model('bebidas', mySchema);

export default model;