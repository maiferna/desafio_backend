const model = require('../models/serviceProductExecutionModel');

/**
 * Recive todos los servicios de producto de execucion
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getAllServiceProductExecutionsController = async (req, res) => {
    const result = await model.getAllServiceProductExecutions();
    res.json(result);
};

/**
 * Recive un servicio de producto de execucion por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getServiceProductExecutionByIdController = async (req, res) => {
    const result = await model.getServiceProductExecutionById(req.params.id);
    res.json(result);
};
/**
 * Recive un servicio de producto de execucion por id de servicio de execucion
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getServiceProductExecutionsByServiceExecutionIdController = async (req, res) => {
    const result = await model.getServiceProductExecutionsByServiceExecutionId(req.params.serviceExecutionId);
    res.json(result);
};

/**
 * Crea un servicio de producto de execucion
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const createServiceProductExecutionController = async (req, res) => {
    const result = await model.createServiceProductExecution(req.body);
    res.status(201).json(result);
};

/**
 * Actualiza un servicio de producto de execucion
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const updateServiceProductExecutionController = async (req, res) => {
    const result = await model.updateServiceProductExecution(req.params.id, req.body);
    res.json(result);
};

/**
 * Elimina un servicio de producto de execucion
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const deleteServiceProductExecutionController = async (req, res) => {
    const result = await model.deleteServiceProductExecution(req.params.id);
    res.json(result);
};

module.exports = {
    getAllServiceProductExecutionsController,
    getServiceProductExecutionByIdController,
    getServiceProductExecutionsByServiceExecutionIdController,
    createServiceProductExecutionController,
    updateServiceProductExecutionController,
    deleteServiceProductExecutionController
};
