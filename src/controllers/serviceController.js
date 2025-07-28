const {
    getAllServices,
    getServiceById,
    createService,
    updateServiceById,
    deleteServiceById,
} = require('../models/serviceModel');

/**
 * Recive todos los servicios
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getAllServicesController = async (req, res) => {
    try {
        const services = await getAllServices();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error });
    }
};

/**
 * Recive una ruta por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getServiceByIdController = async (req, res) => {
    try {
        const service = await getServiceById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service', error });
    }
};

/**
 * Crea una nueva ruta
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const createServiceController = async (req, res) => {
    try {
        console.log(req.body)
        const { nombre, descripcion, datos } = req.body;
        const newService = await createService({ nombre, descripcion, datos });
        res.status(201).json(newService);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating service', error });
    }
};

/**
 * Actualiza una ruta
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const updateServiceController = async (req, res) => {
    try {
        const { nombre, descripcion, datos } = req.body;
        const id = req.params.id;
        const updatedService = await updateServiceById(id, { nombre, descripcion, datos });
        if (!updatedService) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service', error });
    }
};

/**
 * Elimina una ruta
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const deleteServiceController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedService = await deleteServiceById(id);
        if (!deletedService) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json({ message: 'Service deleted', deletedService });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error });
    }
};

module.exports = {
    getAllServicesController,
    getServiceByIdController,
    createServiceController,
    updateServiceController,
    deleteServiceController,
};
