import TragosModel from '../models/tragosModel.js';
import Respuesta from '../classes/Respuesta.js';

class TragosController {

    static async getAllTragos(req, res) 
    {
        try {
            const tragos = await TragosModel.find();
            return Respuesta.success(res, 200, 'Tragos obtenidos:', tragos);
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 500, 'No se pudo obtener los tragos');
        }
    }

    static async getTragoId(req, res)
    {
        try {
            const {id} = req.params;
            const trago = await TragosModel.findById(id);

            if(trago) {
                return Respuesta.success(res, 200, 'Trago obtenida por id:', trago);
            } else {
                return Respuesta.error(res, 404, 'Trago no encontrado');
            }
        } catch(error) {
            console.error(error);
            return Respuesta.error(res, 500, 'Error en el servidor');
        }
    }

    static async postTrago(req, res)
    {
        try {
            const {nombre, sabor, preparacion, ingredientes} = req.body;

            if (!Array.isArray(ingredientes) || ingredientes.length === 0){
                return Respuesta.error(res, 400, 'Debe enviar al menos un ingrediente');
            }

            if(!nombre || !sabor || !preparacion){
                return Respuesta.error(res, 400, 'Faltan campos');
            }

            const existe = await TragosModel.findOne({ nombre });
            if (existe) {
                return Respuesta.error(res, 400, 'El nombre del trago ya existe');
            }

            const trago = new TragosModel({nombre, sabor, preparacion, ingredientes});
            const data = await trago.save();

            return Respuesta.success(res, 201, 'Trago cargado', data);
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 500, 'No se pudo guardar el trago');
        }
    }

    static async deleteTrago(req, res)
    {
        try {
            const {id} = req.params;
            const trago = await TragosModel.findByIdAndDelete(id);
            if(trago) {
                return Respuesta.success(res, 200, 'Trago eliminado', trago);
            } else {
                return Respuesta.error(res, 404, 'Trago no encontrado');
            }
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 200, 'Error al eliminar el trago');
        }
    }

    static async updateTrago(req, res)
    {
        try {
            const {id} = req.params;
            const {sabor, preparacion, ingredientes} = req.body;

            if (!Array.isArray(ingredientes) || ingredientes.length === 0){
                return Respuesta.error(res, 400, 'Debe enviar al menos un ingrediente');
            }
            
            if(!sabor || !preparacion || !ingredientes){
                return Respuesta.error(res, 400, 'Faltan campos');
            }

            const trago = await TragosModel.findByIdAndUpdate(id, {sabor, preparacion, ingredientes}); 
            return Respuesta.success(res, 200, 'Trago actualizado', trago);
        } catch (error) {
            console.error(error);
            return Respuesta.error(res, 500, 'Error en el servidor');
        }
    }
}

export default TragosController;