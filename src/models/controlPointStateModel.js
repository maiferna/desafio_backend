const { dbQuery } = require('../utils/dbQueryUtil');
const { controlPointStateQueries } = require('../queries/controlPointStateQueries');

const getAllControlPointStates = async () => {
    const res = await dbQuery(controlPointStateQueries.getAllControlPointStates);
    return res.rows;
};

const getControlPointStateById = async (id) => {
    const res = await dbQuery(controlPointStateQueries.getControlPointStateById, [id]);
    return res.rows[0];
};

const createControlPointState = async ({ nombre, descripcion }) => {
    const res = await dbQuery(controlPointStateQueries.createControlPointState, [nombre, descripcion]);
    return res.rows[0];
};

const updateControlPointState = async (id, { nombre, descripcion }) => {
    const res = await dbQuery(controlPointStateQueries.updateControlPointState, [nombre, descripcion, id]);
    return res.rows[0];
};

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
