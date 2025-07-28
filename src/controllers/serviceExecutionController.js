const {
    getAllServiceExecutions,
    getServiceExecutionById,
    getServiceExecutionsByVisitId,
    createServiceExecution,
    updateServiceExecutionById,
    deleteServiceExecutionById,
} = require('../models/serviceExecutionModel');

// GET /api/v1/service-executions
/**
 * Recive todos los servicios de execucion
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getAllServiceExecutionsController = async (req, res) => {
    try {
        const executions = await getAllServiceExecutions();
        res.status(200).json(executions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service executions', error });
    }
};

// GET /api/v1/service-executions/:id
/**
 * Recive un servicios de execucion por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getServiceExecutionByIdController = async (req, res) => {
    try {
        const execution = await getServiceExecutionById(req.params.id);
        if (!execution) return res.status(404).json({ message: 'Service execution not found' });
        res.status(200).json(execution);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching service execution', error });
    }
};

// GET /api/v1/service-executions/visit/:visitId
/**
 * Recive un servicio de execucion por id de visita
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getServiceExecutionsByVisitIdController = async (req, res) => {
    try {
        const executions = await getServiceExecutionsByVisitId(req.params.visitId);
        res.status(200).json(executions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service executions by visit', error });
    }
};

// POST /api/v1/service-executions
/**
 * Crea un nuevo servicio de execucion
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const createServiceExecutionController = async (req, res) => {
    try {
        const { id_visita, id_servicio, observaciones, datos } = req.body;
        const newExecution = await createServiceExecution({ id_visita, id_servicio, observaciones, datos });
        res.status(201).json(newExecution);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating service execution', error });
    }
};

// PUT /api/v1/service-executions/:id
/**
 * Actualiza un servicio de execucion
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const updateServiceExecutionController = async (req, res) => {
    try {
        const id = req.params.id;
        const { id_visita, id_servicio, observaciones, datos } = req.body;
        const updatedExecution = await updateServiceExecutionById(id, { id_visita, id_servicio, observaciones, datos });
        if (!updatedExecution) return res.status(404).json({ message: 'Service execution not found' });
        res.status(200).json(updatedExecution);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error updating service execution', error });
    }
};

// DELETE /api/v1/service-executions/:id
/**
 * Elimina un servicio de execucion
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const deleteServiceExecutionController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedExecution = await deleteServiceExecutionById(id);
        if (!deletedExecution) return res.status(404).json({ message: 'Service execution not found' });
        res.status(200).json({ message: 'Service execution deleted', deletedExecution });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service execution', error });
    }
};

module.exports = {
    getAllServiceExecutionsController,
    getServiceExecutionByIdController,
    getServiceExecutionsByVisitIdController,
    createServiceExecutionController,
    updateServiceExecutionController,
    deleteServiceExecutionController,
};
