class Respuesta {
    static success(res, status, mensaje, data = null) {
        return res.status(status).json({mensaje, data});
    }

    static error(res, status, mensaje) {
        return res.status(status).json({mensaje});
    }
}

export default Respuesta;