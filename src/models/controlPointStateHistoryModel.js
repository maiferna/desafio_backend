const { dbQuery } = require('../utils/dbQueryUtil');
const { controlPointStateHistoryQueries } = require('../queries/controlPointStateHistoryQueries');

/**
 * Recive todos los historiales de puntos de control
 * @returns todos del historiales de puntos de control
 */
const getAllControlPointStateHistory = async () => {
    const res = await dbQuery(controlPointStateHistoryQueries.getAllControlPointStates);
    return res.rows;
};

/**
 * Recive todos los historiales de puntos de control por id de punto de control
 * @param {Number} controlPointId id de punto de control
 * @returns el historiales de puntos de control por el id de punto de control
 */
const getControlPointStateHistoryByControlPointId = async (controlPointId) => {
    const res = await dbQuery(
        controlPointStateHistoryQueries.getControlPointStatesByControlPointId,
        [controlPointId]
    );
    return res.rows;
};


/**
 * Recive el historiales de puntos de control por id
 * @param {Number} id id del historiales de puntos de control
 * @returns el historiales de puntos de control por id
 */
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

/**
 * Crea un nuevo historial de puntos de control
 * @param {Number} param0 campos para crear un historial de puntos de control
 * @returns historial de puntos de control creado
 */
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

/**
 * Actualizar un historial de puntos de control
 * @param {Number} id id de historial de puntos de control
 * @param {*} param1 campos para actualizar un historial de puntos de control
 * @returns el historial de puntos de control actualizado
 */
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

/**
 * Eliminar un historial de puntos de control
 * @param {Number} id id de un historial de puntos de control
 * @returns el historial de puntos de control eliminado
 */
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
