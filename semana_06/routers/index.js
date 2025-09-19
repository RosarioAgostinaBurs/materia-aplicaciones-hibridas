import userRouter from './userRouter.js';

const rutas = (app) => {
    app.use('/api/users', userRouter);
}

export default rutas;