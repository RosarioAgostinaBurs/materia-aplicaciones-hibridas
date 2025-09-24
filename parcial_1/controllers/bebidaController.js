import BebidaModel from '../models/bebidaModel.js';
import Respuesta from '../classes/Respuesta.js';

class BebidaController {

    static async getAllBebidas(req, res) 
    {
        try {
            const bebidas = await BebidaModel.find();
            return Respuesta.success(res, 200, 'Bebidas obtenidas:', bebidas);
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 500, 'No se pudo obtener las bebidas');
        }
    }

    static async getBebidaId(req, res)
    {
        try {
            const {id} = req.params;
            const bebida = await BebidaModel.findById(id);

            if(bebida) {
                return Respuesta.success(res, 200, 'Bebida obtenida por id:', bebida);
            } else {
                return Respuesta.error(res, 404, 'Bebida no encontrada');
            }
        } catch(error) {
            console.error(error);
            return Respuesta.error(res, 500, 'Error en el servidor');
        }
    }

    static async postBebida(req, res)
    {
        try {
            const {nombre, marca, origen, tipo, graduacion} = req.body;
            if(!nombre || !marca || !origen || !tipo || !graduacion){
                return Respuesta.error(res, 400, 'Faltan campos');
            }

            const existe = await BebidaModel.findOne({ nombre, marca });
            if (existe) {
                return Respuesta.error(res, 400, 'La bebida con esa marca ya existe');
            }

            const gradAlcoholica = Number(graduacion);
            if (isNaN(gradAlcoholica) || gradAlcoholica < 0 || gradAlcoholica > 100) {
                return Respuesta.error(res, 400, 'Graduación alcohólica inválida (0-100)');
            }

            const bebida = new BebidaModel({nombre, marca, origen, tipo, graduacion});
            const data = await bebida.save();

            return Respuesta.success(res, 201, 'Bebida cargada', data);
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 500, 'No se pudo guardar la bebida');
        }
    }

    static async deleteBebida(req, res)
    {
        try {
            const {id} = req.params;
            const bebida = await BebidaModel.findByIdAndDelete(id);
            if(bebida) {
                return Respuesta.success(res, 200, 'Bebida eliminada', bebida);
            } else {
                return Respuesta.error(res, 404, 'Bebida no encontrada');
            }
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 500, 'Error al eliminar la bebida');
        }
    }

    static async updateBebida(req, res)
    {
        try {
            const {id} = req.params;
            const {origen, graduacion} = req.body;
            
            if(!origen || !graduacion){
                return Respuesta.error(res, 400, 'Faltan campos');
            }

            const gradAlcoholica = Number(graduacion);
            if (isNaN(gradAlcoholica) || gradAlcoholica < 0 || gradAlcoholica > 100) {
                return Respuesta.error(res, 400, 'Graduación alcohólica inválida (0-100)');
            }

            const bebida = await BebidaModel.findByIdAndUpdate(id, {origen, graduacion}); 
            return Respuesta.success(res, 200, 'Bebida actualizada', bebida);
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 500, 'Error en el servidor');
        }
    }
}

export default BebidaController;