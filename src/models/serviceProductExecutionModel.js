const { dbQuery } = require('../utils/dbQueryUtil');
const { serviceProductExecutionQueries } = require('../queries/serviceProductExecutionQueries');

/**
 * Recive todos los servicios de producto de execucion
 * @returns todos los servicios de producto de execucion
 */
const getAllServiceProductExecutions = async () => {
    const res = await dbQuery(serviceProductExecutionQueries.getAllServiceProductExecutions);
    return res.rows;
};

/**
 * Recive un servicio de producto de execucion por id
 * @param {Number} id id de servicio de producto de execucion
 * @returns el servicio de producto de execucion por id
 */
const getServiceProductExecutionById = async (id) => {
    const res = await dbQuery(serviceProductExecutionQueries.getServiceProductExecutionById, [id]);
    return res.rows[0];
};

/**
 * Recive un servicio de producto de ejecucion por id de servicio de ejecucion 
 * @param {Number} id id de servicio de ejecucion
 * @returns el servicio de producto de ejecucion
 */
const getServiceProductExecutionsByServiceExecutionId = async (id) => {
    const res = await dbQuery(serviceProductExecutionQueries.getServiceProductExecutionsByServiceExecutionId, [id]);
    return res.rows;
};

/**
 * Crea un nuevo servicio de producto de execucion
 * @param {*} param0 Campos para crear un servicio de producto de execucion
 * @returns el servicio de producto de execucion creado
 */
const createServiceProductExecution = async ({ id_ejecucion_servicio, id_producto, cantidad }) => {
    const res = await dbQuery(serviceProductExecutionQueries.createServiceProductExecution, [
        id_ejecucion_servicio,
        id_producto,
        cantidad
    ]);
    return res.rows[0];
};

/**
 * Actualiza un servicio de producto de execucion
 * @param {Number} id id de servicio de producto de execucion
 * @param {*} param1 campos para actualizar el servicio de producto de execucion
 * @returns el servicio de producto de execucion actualizada
 */
const updateServiceProductExecution = async (id, { id_ejecucion_servicio, id_producto, cantidad }) => {
    const res = await dbQuery(serviceProductExecutionQueries.updateServiceProductExecution, [
        id_ejecucion_servicio,
        id_producto,
        cantidad,
        id
    ]);
    return res.rows[0];
};

/**
 * Elimina un servicio de producto de execucion
 * @param {Number} id id de servicio de producto de execucion
 * @returns el servicio de producto de execucion eliminado
 */
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
