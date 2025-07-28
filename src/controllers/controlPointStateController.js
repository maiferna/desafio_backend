const {
    getAllControlPointStates,
    getControlPointStateById,
    createControlPointState,
    updateControlPointState,
    deleteControlPointState,
} = require('../models/controlPointStateModel');

/**
 * Recive todos los estados de un puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getAllControlPointStatesController = async (req, res) => {
    try {
        const states = await getAllControlPointStates();
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching control point states', error });
    }
};

/**
 * Recive un estado de un puntos de control por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getControlPointStateByIdController = async (req, res) => {
    try {
        const state = await getControlPointStateById(req.params.id);
        if (!state) return res.status(404).json({ message: 'Control point state not found' });
        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching control point state', error });
    }
};

/**
 * Crea un nuevo estado de un puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const createControlPointStateController = async (req, res) => {
    try {
        const newState = await createControlPointState(req.body);
        res.status(201).json(newState);
    } catch (error) {
        res.status(500).json({ message: 'Error creating control point state', error });
    }
};

/**
 * Actualiza un estado de un puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const updateControlPointStateController = async (req, res) => {
    try {
        const updatedState = await updateControlPointState(req.params.id, req.body);
        if (!updatedState) return res.status(404).json({ message: 'Control point state not found' });
        res.status(200).json(updatedState);
    } catch (error) {
        res.status(500).json({ message: 'Error updating control point state', error });
    }
};

/**
 * Elimina un estado de un puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const deleteControlPointStateController = async (req, res) => {
    try {
        const deletedState = await deleteControlPointState(req.params.id);
        if (!deletedState) return res.status(404).json({ message: 'Control point state not found' });
        res.status(200).json(deletedState);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting control point state', error });
    }
};

module.exports = {
    getAllControlPointStatesController,
    getControlPointStateByIdController,
    createControlPointStateController,
    updateControlPointStateController,
    deleteControlPointStateController,
};
