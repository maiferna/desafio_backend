/**
 * Queries de historial de estados de puntos de control
 */
const controlPointStateHistoryQueries = {
    getAllControlPointStates: `SELECT * FROM historial_estado_punto_control`,
    getControlPointStatesByControlPointId: `SELECT * FROM historial_estado_punto_control WHERE id_punto_control = $1`,
    getControlPointStatesByExecutionId: `SELECT * FROM historial_estado_punto_control WHERE id_ejecucion_servicio = $1`,
    getControlPointStateHistoryById: `SELECT * FROM historial_estado_punto_control WHERE id_historial_estado_punto_control = $1`,
    createControlPointState: `
        INSERT INTO historial_estado_punto_control (
            id_estado_punto_control,
            id_punto_control,
            id_ejecucion_servicio,
            observaciones
        ) VALUES ($1, $2, $3, $4)
        RETURNING *
    `,
    updateControlPointState: `
        UPDATE historial_estado_punto_control
        SET
            id_estado_punto_control = $1,
            id_punto_control = $2,
            id_ejecucion_servicio = $3,
            observaciones = $4
        WHERE id_historial_estado_punto_control = $5
        RETURNING *
    `,
    deleteControlPointState: `
        DELETE FROM historial_estado_punto_control
        WHERE id_historial_estado_punto_control = $1
        RETURNING *
    `,
};

module.exports = { controlPointStateHistoryQueries };
