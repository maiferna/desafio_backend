const { dbQuery } = require('../utils/dbQueryUtil');
const { controlPointStateQueries } = require('../queries/controlPointStateQueries');

/**
 * Recive todos los estados de un punto de control
 * @returns todos los estados de un punto de control
 */
const getAllControlPointStates = async () => {
    const res = await dbQuery(controlPointStateQueries.getAllControlPointStates);
    return res.rows;
};

/**
 * Recive los estados de un punto de control por id
 * @param {Number} id id de estados de un punto de control
 * @returns el estado del punto de control
 */
const getControlPointStateById = async (id) => {
    const res = await dbQuery(controlPointStateQueries.getControlPointStateById, [id]);
    return res.rows[0];
};

/**
 * Crea un estados de un punto de control
 * @param {*} param0 campos para crear un estados de un punto de control
 * @returns el estados de un punto de control creado
 */
const createControlPointState = async ({ nombre, color }) => {
    const res = await dbQuery(controlPointStateQueries.createControlPointState, [nombre, color]);
    return res.rows[0];
};

/**
 * Actualiza un estados de un punto de control
 * @param {Number} id id de estados de un punto de control
 * @param {*} param1 campos de estados de un punto de control para actualizar
 * @returns el estados de un punto de control actualizado
 */
const updateControlPointState = async (id, { nombre, color }) => {
    const res = await dbQuery(controlPointStateQueries.updateControlPointState, [nombre, color, id]);
    return res.rows[0];
};

/**
 * Elimina un estados de un punto de control
 * @param {Number} id id de estados de un punto de control
 * @returns el estados de un punto de control eliminado
 */
const deleteControlPointState = async (id) => {
    const res = await dbQuery(controlPointStateQueries.deleteControlPointState, [id]);
    return res.rows[0];
};

module.exports = {
    getAllControlPointStates,
    getControlPointStateById,
    createControlPointState,
    updateControlPointState,
    deleteControlPointState,
};
