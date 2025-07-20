const controlPointStateHistoryQueries = {
    getAllControlPointStates: `
        SELECT * FROM historial_estado_punto_control
    `,
    getControlPointStatesByControlPointId: `
        SELECT * FROM historial_estado_punto_control
        WHERE id_punto_control = $1
    `,
    getControlPointStatesByExecutionId: `
        SELECT * FROM historial_estado_punto_control
        WHERE id_ejecucion_servicio = $1
    `,
    createControlPointState: `
        INSERT INTO historial_estado_punto_control (
            id_estado_punto_control,
            id_punto_control,
            id_ejecucion_servicio,
            observaciones
        ) VALUES ($1, $2, $3, $4)
        RETURNING *
    `,
};

module.exports = { controlPointStateHistoryQueries };
