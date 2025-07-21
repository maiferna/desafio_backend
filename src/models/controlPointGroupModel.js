const { dbQuery } = require('../utils/dbQueryUtil');
const { controlPointGroupQueries } = require('../queries/controlPointGroupQueries');

const getAllControlPointGroups = async () => {
    const res = await dbQuery(controlPointGroupQueries.getAllControlPointGroups);
    return res.rows;
};

const getControlPointGroupById = async (id) => {
    const res = await dbQuery(controlPointGroupQueries.getControlPointGroupById, [id]);
    return res.rows[0];
};

const createControlPointGroup = async ({ nombre, descripcion }) => {
    const res = await dbQuery(controlPointGroupQueries.createControlPointGroup, [nombre, descripcion]);
    return res.rows[0];
};

const updateControlPointGroup = async (id, { nombre, descripcion }) => {
    const res = await dbQuery(controlPointGroupQueries.updateControlPointGroup, [nombre, descripcion, id]);
    return res.rows[0];
};

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
