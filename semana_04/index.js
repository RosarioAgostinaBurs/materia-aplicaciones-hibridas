/* Reemplazamos el require por el import de esta forma, solo tenemos que en el package.json 
poner debajo del main "type": "module" y ya lo podemos hacer así. */
import express from 'express';
import dotenv from "dotenv";
import rutas from './routers/index.js';

// Esto era para poder usar las variables de entorno, y usamos la variable PORT.
dotenv.config();
const PORT = process.env.PORT;

const app = express(); // Hago esto para poder usar Express.
app.use(express.json()); // Esto era para que Express pueda leer los json.

/* Middleware para que me de archivos estáticos (html, css, imgs),
osea cuando este en la raíz del sitio me tiene que entregar los arhivos de la carpeta public.
Lo primero es la ruta en la que tengo que estar, y luego la ruta de la carpeta que quiero usar. */
app.use('/', express.static('public')); // Así express puede usar archivos estáticos


/* Middleware, esta entre el req y el res, intercepta todo. */
app.use((req, res, next) => {
    console.log('Estoy interceptando todo');
    next(); // A los middleware si o si le tengo que poner el next en el parámetro y acá, para que intercepta y luego siga, sino queda cargando.
})


app.get('/', (req, res) => {
    res.send('<h1>API H1</h1>');
});

app.get('/api/users', (req, res) => {
    const users = [
        {"id": 1,
        "nombre": "Ro",
        "email": "ro@gmail.com"},
        {"id": 2,
        "nombre": "Jose",
        "email": "jose@gmail.com"},
        {"id": 3,
        "nombre": "María",
        "email": "maria@gmail.com"}
    ];
    res.status(200).json(users);
});

rutas(app); // Le paso la app de Express como parámetro a las rutas en el archivo routers/index.js

// Uno el puerto con la app de Express
app.listen(PORT, () => {
    console.log(`API en el puerto ${PORT}`);
})