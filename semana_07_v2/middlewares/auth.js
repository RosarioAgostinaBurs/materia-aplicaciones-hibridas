import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import Respuesta from '../classes/Respuesta.js';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const validarToken = (req, res, next) => {
    const token = req.headers.authorization;
    
    if(!token) {
        return Respuesta.error(res, 401, 'No se paso el JWT');
   }

   console.log(token);

    const jwt = token.split(' ')[1];
    console.log(jwt);
    

    try {
        const decode = jsonwebtoken.verify(jwt, SECRET_KEY);
        req.body.userId = decode.id;
        return next();
    } catch (error) {
        return Respuesta.error(res, 401, 'Token inválido');
    }
    
}

export {validarToken}
