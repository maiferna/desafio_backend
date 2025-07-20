const { dbQuery } = require('../utils/dbQueryUtil');
const { serviceExecutionQueries } = require('../queries/serviceExecutionQueries');

const getAllServiceExecutions = async () => {
    const res = await dbQuery(serviceExecutionQueries.getAllServiceExecutions);
    return res.rows;
};

const getServiceExecutionById = async (id) => {
    const res = await dbQuery(serviceExecutionQueries.getServiceExecutionById, [id]);
    return res.rows[0];
};

const getServiceExecutionsByVisitId = async (visitId) => {
    const res = await dbQuery(serviceExecutionQueries.getServiceExecutionsByVisitId, [visitId]);
    return res.rows;
};

const createServiceExecution = async ({ id_visita, id_servicio, observaciones, datos }) => {
    const res = await dbQuery(serviceExecutionQueries.createServiceExecution, [
        id_visita,
        id_servicio,
        observaciones,
        datos,
    ]);
    return res.rows[0];
};

const updateServiceExecutionById = async (id, { id_visita, id_servicio, observaciones, datos }) => {
    const res = await dbQuery(serviceExecutionQueries.updateServiceExecutionById, [
        id_visita,
        id_servicio,
        observaciones,
        datos,
        id,
    ]);
    return res.rows[0];
};

const deleteServiceExecutionById = async (id) => {
    const res = await dbQuery(serviceExecutionQueries.deleteServiceExecutionById, [id]);
    return res.rows[0];
};

module.exports = {
    getAllServiceExecutions,
    getServiceExecutionById,
    getServiceExecutionsByVisitId,
    createServiceExecution,
    updateServiceExecutionById,
    deleteServiceExecutionById,
};
