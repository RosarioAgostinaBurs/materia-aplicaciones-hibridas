import express from 'express';
import dotenv from "dotenv";
import rutas from './routers/index.js';
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT;
const URI_BD = process.env.URI_DB;

mongoose.connect(URI_BD);
const db = mongoose.connection;

db.on('error', () => {
    console.error('No podemos conectar con la base de datos'); 
})

db.once('open', () => {
    console.log('Conectado con la base de datos');
});

const app = express();
app.use(express.json());

app.use('/', express.static('public'));


app.use((req, res, next) => {
    next();
})


app.get('/', (req, res) => {
    res.send('<h1>API H1</h1>');
});


rutas(app);

app.listen(PORT, () => {
    console.log(`API en el puerto ${PORT}`);
})