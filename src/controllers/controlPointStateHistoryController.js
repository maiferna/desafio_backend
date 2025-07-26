const {
    getAllControlPointStateHistory,
    getControlPointStateHistoryById,
    getControlPointStateHistoryByControlPointId,
    createControlPointStateHistory,
    updateControlPointStateHistory,
    deleteControlPointStateHistory
} = require('../models/controlPointStateHistoryModel');

/**
 * Recive todos los historiales de puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getAllControlPointStateHistoryController = async (req, res) => {
    const result = await getAllControlPointStateHistory();
    res.json(result);
};

/**
 * Recive un historial de puntos de control por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getControlPointStateHistoryByIdController = async (req, res) => {
    const result = await getControlPointStateHistoryById(req.params.id);
    if (!result) return res.status(404).json({ message: 'State history not found' });
    res.json(result);
};

/**
 * Recive un historial de estado de control de puntos por un id de puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getControlPointStateHistoryByControlPointIdController = async (req, res) => {
    const result = await getControlPointStateHistoryByControlPointId(req.params.controlPointId);
    res.json(result);
};

/**
 * Crea un nuevo historial de puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const createControlPointStateHistoryController = async (req, res) => {
    const result = await createControlPointStateHistory(req.body);
    res.status(201).json(result);
};

/**
 * Actualiza un historial de puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const updateControlPointStateHistoryController = async (req, res) => {
    const result = await updateControlPointStateHistory(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: 'State history not found' });
    res.json(result);
};

/**
 * Eliminar un historial de puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const deleteControlPointStateHistoryController = async (req, res) => {
    const result = await deleteControlPointStateHistory(req.params.id);
    if (!result) return res.status(404).json({ message: 'State history not found' });
    res.json(result);
};

module.exports = {
    getAllControlPointStateHistoryController,
    getControlPointStateHistoryByIdController,
    getControlPointStateHistoryByControlPointIdController,
    createControlPointStateHistoryController,
    updateControlPointStateHistoryController,
    deleteControlPointStateHistoryController
};
