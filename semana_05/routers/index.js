import userRouter from '../routers/userRouter.js';

const rutas = (app) => {
    app.use('/api/users', userRouter);
}

export default rutas;