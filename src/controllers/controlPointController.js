const {
    getAllControlPoints,
    getControlPointById,
    getControlPointsByInstallationId,
    createControlPoint,
    updateControlPoint,
    deleteControlPoint
} = require('../models/controlPointModel');

/**
 * Recive todos los puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getAllControlPointsController = async (req, res) => {
    const result = await getAllControlPoints();
    res.json(result);
};

/**
 * Recive un puntos de control por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getControlPointByIdController = async (req, res) => {
    const result = await getControlPointById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Control point not found' });
    res.json(result);
};

/**
 * Recive un puntos de control por id de instalación
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getControlPointsByInstallationIdController = async (req, res) => {
    const result = await getControlPointsByInstallationId(req.params.installationId);
    res.json(result);
};

/**
 * Crea un nuevo punto de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const createControlPointController = async (req, res) => {
    const result = await createControlPoint(req.body);
    res.status(201).json(result);
};

/**
 * Actualiza un punto de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const updateControlPointController = async (req, res) => {
    const result = await updateControlPoint(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: 'Control point not found' });
    res.json(result);
};

/**
 * Elimina un punto de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const deleteControlPointController = async (req, res) => {
    const result = await deleteControlPoint(req.params.id);
    if (!result) return res.status(404).json({ message: 'Control point not found' });
    res.json(result);
};

module.exports = {
    getAllControlPointsController,
    getControlPointByIdController,
    getControlPointsByInstallationIdController,
    createControlPointController,
    updateControlPointController,
    deleteControlPointController
};
