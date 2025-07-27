const { dbQuery } = require('../utils/dbQueryUtil');
const { controlPointStateHistoryQueries } = require('../queries/controlPointStateHistoryQueries');

const getAllControlPointStateHistory = async () => {
    const res = await dbQuery(controlPointStateHistoryQueries.getAllControlPointStates);
    return res.rows;
};

const getControlPointStateHistoryByControlPointId = async (controlPointId) => {
    const res = await dbQuery(
        controlPointStateHistoryQueries.getControlPointStatesByControlPointId,
        [controlPointId]
    );
    return res.rows;
};
const getControlPointStateHistoryByVisitId = async (visitId) => {
    const res = await dbQuery(
        controlPointStateHistoryQueries.getControlPointStateHistoryByVisitId,
        [visitId]
    );
    return res.rows;
}
const getControlPointStateHistoryById = async (id) => {
    const res = await dbQuery(
        controlPointStateHistoryQueries.getControlPointStateHistoryById,
        [id]
    );
    return res.rows[0];
};

const createControlPointStateHistory = async ({
    id_estado_punto_control,
    id_punto_control,
    id_ejecucion_servicio,
    observaciones,
}) => {
    const res = await dbQuery(
        controlPointStateHistoryQueries.createControlPointState,
        [
            id_estado_punto_control,
            id_punto_control,
            id_ejecucion_servicio,
            observaciones,
        ]
    );
    return res.rows[0];
};

const updateControlPointStateHistory = async (id, {
    id_estado_punto_control,
    id_punto_control,
    id_ejecucion_servicio,
    observaciones,
}) => {
    const res = await dbQuery(
        controlPointStateHistoryQueries.updateControlPointState,
        [
            id_estado_punto_control,
            id_punto_control,
            id_ejecucion_servicio,
            observaciones,
            id
        ]
    );
    return res.rows[0];
};

const deleteControlPointStateHistory = async (id) => {
    const res = await dbQuery(
        controlPointStateHistoryQueries.deleteControlPointState,
        [id]
    );
    return res.rows[0];
};

module.exports = {
    getAllControlPointStateHistory,
    getControlPointStateHistoryByControlPointId,
    getControlPointStateHistoryById,
    createControlPointStateHistory,
    updateControlPointStateHistory,
    deleteControlPointStateHistory,
    getControlPointStateHistoryByVisitId
};
