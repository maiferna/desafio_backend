const { dbQuery } = require('../utils/dbQueryUtil');
const { pestQueries } = require('../queries/pestQueries');

const getAllPests = async () => {
    const res = await dbQuery(pestQueries.getAllPests);
    return res.rows;
};

const getPestById = async (id) => {
    const res = await dbQuery(pestQueries.getPestById, [id]);
    return res.rows[0];
};

const createPest = async ({ nombre }) => {
    const res = await dbQuery(pestQueries.createPest, [nombre]);
    return res.rows[0];
};

const updatePest = async (id, { nombre }) => {
    const res = await dbQuery(pestQueries.updatePest, [nombre, id]);
    return res.rows[0];
};

const deletePest = async (id) => {
    const res = await dbQuery(pestQueries.deletePest, [id]);
    return res.rows[0];
};

module.exports = {
    getAllPests,
    getPestById,
    createPest,
    updatePest,
    deletePest,
};
