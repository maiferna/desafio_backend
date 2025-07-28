const {
    getAllCaptures,
    getCaptureById,
    createCapture,
    updateCapture,
    deleteCapture
} = require('../models/captureModel');

/**
 * Recive todas las capturas
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getAllCapturesController = async (req, res) => {
    try {
        const captures = await getAllCaptures();
        res.status(200).json(captures);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching captures', error });
    }
};

/**
 * Recive la captura por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getCaptureByIdController = async (req, res) => {
    try {
        const capture = await getCaptureById(req.params.id);
        if (!capture) return res.status(404).json({ message: 'Capture not found' });
        res.status(200).json(capture);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching capture', error });
    }
};

/**
 * Crear una captura
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const createCaptureController = async (req, res) => {
    try {
        const newCapture = await createCapture(req.body);
        res.status(201).json(newCapture);
    } catch (error) {
        res.status(500).json({ message: 'Error creating capture', error });
    }
};

/**
 * Actualizar una captura
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const updateCaptureController = async (req, res) => {
    try {
        const updatedCapture = await updateCapture(req.params.id, req.body);
        if (!updatedCapture) return res.status(404).json({ message: 'Capture not found' });
        res.status(200).json(updatedCapture);
    } catch (error) {
        res.status(500).json({ message: 'Error updating capture', error });
    }
};

/**
 * Elimina una captura
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const deleteCaptureController = async (req, res) => {
    try {
        const deletedCapture = await deleteCapture(req.params.id);
        if (!deletedCapture) return res.status(404).json({ message: 'Capture not found' });
        res.status(200).json(deletedCapture);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting capture', error });
    }
};

module.exports = {
    getAllCapturesController,
    getCaptureByIdController,
    createCaptureController,
    updateCaptureController,
    deleteCaptureController
};
