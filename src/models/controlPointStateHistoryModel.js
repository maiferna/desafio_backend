const { dbQuery } = require('../utils/dbQueryUtil');
const { controlPointStateHistoryQueries } = require('../queries/controlPointStateHistoryQueries');

const getAllControlPointStates = async () => {
    const res = await dbQuery(controlPointStateHistoryQueries.getAllControlPointStates);
    return res.rows;
};

const getControlPointStatesByControlPointId = async (controlPointId) => {
    const res = await dbQuery(
        controlPointStateHistoryQueries.getControlPointStatesByControlPointId,
        [controlPointId]
    );
    return res.rows;
};

const getControlPointStatesByExecutionId = async (executionId) => {
    const res = await dbQuery(
        controlPointStateHistoryQueries.getControlPointStatesByExecutionId,
        [executionId]
    );
    return res.rows;
};

const createControlPointState = async ({
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

module.exports = {
    getAllControlPointStates,
    getControlPointStatesByControlPointId,
    getControlPointStatesByExecutionId,
    createControlPointState,
};
