const { dbQuery } = require('../utils/dbQueryUtil');
const { plagueQueries } = require('../queries/plagueQueries');

const getAllPlagues = async () => {
    const res = await dbQuery(plagueQueries.getAllPlagues);
    return res.rows;
};

const getPlagueById = async (id) => {
    const res = await dbQuery(plagueQueries.getPlagueById, [id]);
    return res.rows[0];
};

const createPlague = async ({ nombre }) => {
    const res = await dbQuery(plagueQueries.createPlague, [nombre]);
    return res.rows[0];
};

const updatePlague = async (id, { nombre }) => {
    const res = await dbQuery(plagueQueries.updatePlague, [nombre, id]);
    return res.rows[0];
};

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
