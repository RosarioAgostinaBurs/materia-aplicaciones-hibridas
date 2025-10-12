import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mySchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    sabor: {
        type: String,
        trim: true
    },
    preparacion: {
        type: String,
        trim: true,
        maxLength: 100
    },
    ingredientes: { 
        type: [String] 
    }
});

const model = mongoose.model('tragos', mySchema);

export default model;