import userRouter from './userRouter.js';
import bebidaRouter from './bebidaRouter.js';
import tragoRouter from './tragoRouter.js';

const rutas = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/bebidas', bebidaRouter);
    app.use('/api/tragos', tragoRouter);
}

export default rutas;