/* Decodificación del JWT */

import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

// Se va a estar interponiendo en los request
const validarToken = (req, res, next) => {
    // Leemos el token que se pasa por header
    const token = req.headers.authorization;
    
    // Nos aseguramos que el token se pase (osea que este autorizado)
    if(!token) {
        res.status(401).json({mensaje: 'No se paso el JWT'});
        return;
   }

    // Sacamos el token
    const jwt = token.split(' ')[1];
    console.log(jwt);
    
    
    // Verificación
    jsonwebtoken.verify(jwt, SECRET_KEY, (error, decode) => {
        if(error) {
            res.status(403).json({mensaje: 'Token inválido'});
            return;
        }

        req.body.userId = decode.id;
        console.log({decode});

        next();
    });

    
}

export {validarToken}
