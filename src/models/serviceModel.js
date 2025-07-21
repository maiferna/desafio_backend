const { dbQuery } = require('../utils/dbQueryUtil');
const { serviceQueries } = require('../queries/serviceQueries');

const getAllServices = async () => {
    const res = await dbQuery(serviceQueries.getAllServices);
    return res.rows;
};

const getServiceById = async (id) => {
    const res = await dbQuery(serviceQueries.getServiceById, [id]);
    return res.rows[0];
};

const createService = async ({ nombre, descripcion, datos }) => {
    const res = await dbQuery(serviceQueries.createService, [nombre, descripcion, datos]);
    return res.rows[0];
};

const updateServiceById = async (id, { nombre, descripcion, datos }) => {
    const res = await dbQuery(serviceQueries.updateServiceById, [nombre, descripcion, datos, id]);
    return res.rows[0];
};

const deleteServiceById = async (id) => {
    const res = await dbQuery(serviceQueries.deleteServiceById, [id]);
    return res.rows[0];
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateServiceById,
    deleteServiceById,
};
