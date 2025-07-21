const { dbQuery } = require('../utils/dbQueryUtil');
const { serviceProductExecutionQueries } = require('../queries/serviceProductExecutionQueries');

const getAllServiceProductExecutions = async () => {
    const res = await dbQuery(serviceProductExecutionQueries.getAllServiceProductExecutions);
    return res.rows;
};

const getServiceProductExecutionById = async (id) => {
    const res = await dbQuery(serviceProductExecutionQueries.getServiceProductExecutionById, [id]);
    return res.rows[0];
};

const getServiceProductExecutionsByServiceExecutionId = async (id) => {
    const res = await dbQuery(serviceProductExecutionQueries.getServiceProductExecutionsByServiceExecutionId, [id]);
    return res.rows;
};

const createServiceProductExecution = async ({ id_ejecucion_servicio, id_producto, cantidad }) => {
    const res = await dbQuery(serviceProductExecutionQueries.createServiceProductExecution, [
        id_ejecucion_servicio,
        id_producto,
        cantidad
    ]);
    return res.rows[0];
};

const updateServiceProductExecution = async (id, { id_ejecucion_servicio, id_producto, cantidad }) => {
    const res = await dbQuery(serviceProductExecutionQueries.updateServiceProductExecution, [
        id_ejecucion_servicio,
        id_producto,
        cantidad,
        id
    ]);
    return res.rows[0];
};

const deleteServiceProductExecution = async (id) => {
    const res = await dbQuery(serviceProductExecutionQueries.deleteServiceProductExecution, [id]);
    return res.rows[0];
};

module.exports = {
    getAllServiceProductExecutions,
    getServiceProductExecutionById,
    getServiceProductExecutionsByServiceExecutionId,
    createServiceProductExecution,
    updateServiceProductExecution,
    deleteServiceProductExecution
};
