const captureQueries = {
    getAllCaptures: `
    SELECT * FROM capturas
  `,
    getCaptureById: `
    SELECT * FROM capturas WHERE id_captura = $1
  `,
    getCapturesByPointId: `
    SELECT * FROM capturas WHERE id_punto_control = $1
  `,
    getCapturesByExecutionId: `
    SELECT * FROM capturas WHERE id_ejecucion_servicio = $1
  `,
    createCapture: `
    INSERT INTO capturas (
      id_punto_control,
      id_plaga,
      id_ejecucion_servicio,
      cantidad,
      observaciones
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    updateCapture: `
    UPDATE capturas
    SET
      id_punto_control = $1,
      id_plaga = $2,
      id_ejecucion_servicio = $3,
      cantidad = $4,
      observaciones = $5
    WHERE id_captura = $6
    RETURNING *
  `,
    deleteCapture: `
    DELETE FROM capturas
    WHERE id_captura = $1
    RETURNING *
  `
};

module.exports = { captureQueries };
