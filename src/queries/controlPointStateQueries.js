const controlPointStateQueries = {
    getAllControlPointStates: `
    SELECT * FROM estados_punto_control
  `,
    getControlPointStateById: `
    SELECT * FROM estados_punto_control WHERE id_estado_punto_control = $1
  `,
    createControlPointState: `
    INSERT INTO estados_punto_control (nombre, descripcion)
    VALUES ($1, $2)
    RETURNING *
  `,
    updateControlPointState: `
    UPDATE estados_punto_control
    SET nombre = $1, descripcion = $2
    WHERE id_estado_punto_control = $3
    RETURNING *
  `,
    deleteControlPointState: `
    DELETE FROM estados_punto_control
    WHERE id_estado_punto_control = $1
    RETURNING *
  `
};

module.exports = { controlPointStateQueries };
