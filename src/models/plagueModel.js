const { dbQuery } = require('../utils/dbQueryUtil');
const { plagueQueries } = require('../queries/plagueQueries');

/**
 * Recive todas las plagas
 * @returns todas las plagas
 */
const getAllPlagues = async () => {
    const res = await dbQuery(plagueQueries.getAllPlagues);
    return res.rows;
};

/**
 * Recivir la plaga por id
 * @param {Number} id id de la plaga
 * @returns la plaga por id
 */
const getPlagueById = async (id) => {
    const res = await dbQuery(plagueQueries.getPlagueById, [id]);
    return res.rows[0];
};

/**
 * Crea una nueva plaga
 * @param {*} param0 campos para crear una nueva plaga
 * @returns la nueva plaga creada
 */
const createPlague = async ({ nombre }) => {
    const res = await dbQuery(plagueQueries.createPlague, [nombre]);
    return res.rows[0];
};

/**
 * Actualiza una plaga
 * @param {Number} id id de la plaga
 * @param {*} param1 campos para actualizar la plaga
 * @returns la plaga actualizada
 */
const updatePlague = async (id, { nombre }) => {
    const res = await dbQuery(plagueQueries.updatePlague, [nombre, id]);
    return res.rows[0];
};

/**
 * Eliminar una plaga
 * @param {Number} id id de la plaga
 * @returns la plaga eliminada
 */
const deletePlague = async (id) => {
    const res = await dbQuery(plagueQueries.deletePlague, [id]);
    return res.rows[0];
};

module.exports = {
    getAllPlagues,
    getPlagueById,
    createPlague,
    updatePlague,
    deletePlague,
};
