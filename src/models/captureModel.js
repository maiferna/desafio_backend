const { dbQuery } = require('../utils/dbQueryUtil');
const { captureQueries } = require('../queries/captureQueries');

/**
 * Ver todas las capturas
 * @returns todas las capturas
 */
const getAllCaptures = async () => {
    const res = await dbQuery(captureQueries.getAllCaptures);
    return res.rows;
};

/**
 * Ver la captura por id
 * @param {Number} id id de la captura
 * @returns la captura por id
 */
const getCaptureById = async (id) => {
    const res = await dbQuery(captureQueries.getCaptureById, [id]);
    return res.rows[0];
};

/**
 * Recive la captura por id de punto
 * @param {Number} pointId 
 * @returns la captura por id
 */
const getCapturesByPointId = async (pointId) => {
    const res = await dbQuery(captureQueries.getCapturesByPointId, [pointId]);
    return res.rows;
};

/**
 * Recive la captura por id de ejecucion
 * @param {Number} executionId 
 * @returns la captura por id de ejecucion
 */
const getCapturesByExecutionId = async (executionId) => {
    const res = await dbQuery(captureQueries.getCapturesByExecutionId, [executionId]);
    return res.rows;
};

/**
 * Crear nueva captura
 * @param {*} param0 campos para la inserción
 * @returns captura insertada
 */
const createCapture = async ({
    id_punto_control,
    id_plaga,
    id_ejecucion_servicio,
    cantidad,
    observaciones
}) => {
    const res = await dbQuery(captureQueries.createCapture, [
        id_punto_control,
        id_plaga,
        id_ejecucion_servicio,
        cantidad,
        observaciones
    ]);
    return res.rows[0];
};

/**
 * Modificar una captura
 * @param {Number} id 
 * @param {*} param1 campos para la modificacion
 * @returns captura modificada
 */
const updateCapture = async (
    id,
    {
        id_punto_control,
        id_plaga,
        id_ejecucion_servicio,
        cantidad,
        observaciones
    }
) => {
    const res = await dbQuery(captureQueries.updateCapture, [
        id_punto_control,
        id_plaga,
        id_ejecucion_servicio,
        cantidad,
        observaciones,
        id
    ]);
    return res.rows[0];
};

/**
 * Elimina una captura
 * @param {Number} id id de la captura
 * @returns captura eliminada
 */
const deleteCapture = async (id) => {
    const res = await dbQuery(captureQueries.deleteCapture, [id]);
    return res.rows[0];
};

module.exports = {
    getAllCaptures,
    getCaptureById,
    getCapturesByPointId,
    getCapturesByExecutionId,
    createCapture,
    updateCapture,
    deleteCapture
};
