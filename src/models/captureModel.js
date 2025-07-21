const { dbQuery } = require('../utils/dbQueryUtil');
const { captureQueries } = require('../queries/captureQueries');

const getAllCaptures = async () => {
    const res = await dbQuery(captureQueries.getAllCaptures);
    return res.rows;
};

const getCaptureById = async (id) => {
    const res = await dbQuery(captureQueries.getCaptureById, [id]);
    return res.rows[0];
};

const getCapturesByPointId = async (pointId) => {
    const res = await dbQuery(captureQueries.getCapturesByPointId, [pointId]);
    return res.rows;
};

const getCapturesByExecutionId = async (executionId) => {
    const res = await dbQuery(captureQueries.getCapturesByExecutionId, [executionId]);
    return res.rows;
};

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
