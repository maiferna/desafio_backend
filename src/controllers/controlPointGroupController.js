const {
    getAllControlPointGroups,
    getControlPointGroupById,
    createControlPointGroup,
    updateControlPointGroup,
    deleteControlPointGroup,
} = require('../models/controlPointGroupModel');

/**
 * Recive todos los grupos de puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getAllControlPointGroupsController = async (req, res) => {
    try {
        const groups = await getAllControlPointGroups();
        res.status(200).json({
            ok: true,
            data: groups
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching control point groups', error });
    }
};

/**
 * Recive un grupo de puntos de control por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getControlPointGroupByIdController = async (req, res) => {
    try {
        const group = await getControlPointGroupById(req.params.id);
        if (!group) return res.status(404).json({ message: 'Control point group not found' });
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching control point group', error });
    }
};

/**
 * Crea un nuevo grupo de puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const createControlPointGroupController = async (req, res) => {
    try {
        const newGroup = await createControlPointGroup(req.body);
        res.status(201).json(newGroup);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating control point group', error });
    }
};

/**
 * Actualiza un grupo de puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const updateControlPointGroupController = async (req, res) => {
    try {
        const updatedGroup = await updateControlPointGroup(req.params.id, req.body);
        if (!updatedGroup) return res.status(404).json({ message: 'Control point group not found' });
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(500).json({ message: 'Error updating control point group', error });
    }
};

/**
 * Elimina un grupo de puntos de control
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const deleteControlPointGroupController = async (req, res) => {
    try {
        const deletedGroup = await deleteControlPointGroup(req.params.id);
        if (!deletedGroup) return res.status(404).json({ message: 'Control point group not found' });
        res.status(200).json(deletedGroup);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting control point group', error });
    }
};

module.exports = {
    getAllControlPointGroupsController,
    getControlPointGroupByIdController,
    createControlPointGroupController,
    updateControlPointGroupController,
    deleteControlPointGroupController,
};
