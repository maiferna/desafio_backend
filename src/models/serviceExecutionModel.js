const { dbQuery } = require('../utils/dbQueryUtil');
const { serviceExecutionQueries } = require('../queries/serviceExecutionQueries');

/**
 * Recivir todos los servicios de ejecucion
 * @returns todos los servicios de ejecucion
 */
const getAllServiceExecutions = async () => {
    const res = await dbQuery(serviceExecutionQueries.getAllServiceExecutions);
    return res.rows;
};

/**
 * Recivir un servicio de ejecucion por id
 * @param {Number} id id de servicio de ejecucion
 * @returns el servicio de ejecucion recivido
 */
const getServiceExecutionById = async (id) => {
    const res = await dbQuery(serviceExecutionQueries.getServiceExecutionById, [id]);
    return res.rows[0];
};

/**
 * Recivir servicio de ejecucion por id de visita
 * @param {Number} visitId id de visita
 * @returns el servicio de ejecucion por el id de la ruta
 */
const getServiceExecutionsByVisitId = async (visitId) => {
    const res = await dbQuery(serviceExecutionQueries.getServiceExecutionsByVisitId, [visitId]);
    return res.rows;
};

/**
 * Crea un servicio de ejecucion
 * @param {*} param0 campos para crear un servicio de ejecucion
 * @returns el servicio de ejecucion creado
 */
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

/**
 * Elimina un servicio de ejecucion
 * @param {Number} id id de servicios de ejecucion
 * @returns el servicio de ejecucion eliminado
 */
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
