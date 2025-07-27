const controlPointStateHistoryQueries = {
    getAllControlPointStates: `SELECT * FROM historial_estado_punto_control`,
    getControlPointStatesByControlPointId: `SELECT * FROM historial_estado_punto_control WHERE id_punto_control = $1`,
    getControlPointStatesByExecutionId: `SELECT * FROM historial_estado_punto_control WHERE id_ejecucion_servicio = $1`,
    getControlPointStateHistoryById: `SELECT * FROM historial_estado_punto_control WHERE id_historial_estado_punto_control = $1`,
    getControlPointStateHistoryByVisitId: `
    SELECT 
        h.id_historial_estado_punto_control,
        h.observaciones,
        h.id_estado_punto_control AS id_estado,
        e.nombre AS estado_nombre,
        e.color AS estado_color,
        h.id_punto_control,
        h.id_ejecucion_servicio,
        es.id_visita,
        es.id_servicio
        FROM historial_estado_punto_control h
        LEFT JOIN estados_punto_control e ON h.id_estado_punto_control = e.id_estado_punto_control
        LEFT JOIN ejecuciones_servicios es ON h.id_ejecucion_servicio = es.id_ejecucion_servicio
        WHERE es.id_visita = $1
        ORDER BY h.id_historial_estado_punto_control DESC;`,
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
