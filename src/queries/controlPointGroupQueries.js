const controlPointGroupQueries = {
    getAllControlPointGroups: `
    SELECT * FROM grupos_punto_control
  `,
    getControlPointGroupById: `
    SELECT * FROM grupos_punto_control WHERE id_grupo_punto_control = $1
  `,
    createControlPointGroup: `
    INSERT INTO grupos_punto_control (nombre, descripcion)
    VALUES ($1, $2)
    RETURNING *
  `,
    updateControlPointGroup: `
    UPDATE grupos_punto_control
    SET nombre = $1, descripcion = $2
    WHERE id_grupo_punto_control = $3
    RETURNING *
  `,
    deleteControlPointGroup: `
    DELETE FROM grupos_punto_control
    WHERE id_grupo_punto_control = $1
    RETURNING *
  `
};

module.exports = { controlPointGroupQueries };
