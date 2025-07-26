const { dbQuery } = require('../utils/dbQueryUtil');
const { controlPointGroupQueries } = require('../queries/controlPointGroupQueries');

/**
 * Recive todos los grupos de puntos de control
 * @returns todos los grupos de puntos de control
 */
const getAllControlPointGroups = async () => {
    const res = await dbQuery(controlPointGroupQueries.getAllControlPointGroups);
    return res.rows;
};

/**
 * Recive un grupos de punto de control por id
 * @param {Number} id id del grupos de puntos de control
 * @returns el grupo de puntos de control
 */
const getControlPointGroupById = async (id) => {
    const res = await dbQuery(controlPointGroupQueries.getControlPointGroupById, [id]);
    return res.rows[0];
};

/**
 * Crea un nuevo grupo de puntos de control
 * @param {*} param0 campos de grupo de puntos de control
 * @returns el grupos de puntos de control creado
 */
const createControlPointGroup = async ({ nombre, descripcion }) => {
    const res = await dbQuery(controlPointGroupQueries.createControlPointGroup, [nombre, descripcion]);
    return res.rows[0];
};

/**
 * Actualiza un grupo de puntos de control
 * @param {Number} id id del grupo de puntos de control
 * @param {*} param1 campos de grupo de puntos de control
 * @returns el grupo de puntos de control actualizado
 */
const updateControlPointGroup = async (id, { nombre, descripcion }) => {
    const res = await dbQuery(controlPointGroupQueries.updateControlPointGroup, [nombre, descripcion, id]);
    return res.rows[0];
};

/**
 * Elimina un grupo de puntos de control
 * @param {Number} id id del grupo de puntos de control
 * @returns el grupo de puntos de control eliminado
 */
const deleteControlPointGroup = async (id) => {
    const res = await dbQuery(controlPointGroupQueries.deleteControlPointGroup, [id]);
    return res.rows[0];
};

module.exports = {
    getAllControlPointGroups,
    getControlPointGroupById,
    createControlPointGroup,
    updateControlPointGroup,
    deleteControlPointGroup,
};
