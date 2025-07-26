const routeQueries = {
  getAllRoutes: `
    SELECT * FROM rutas
  `,
  getRouteById: `
    SELECT * FROM rutas WHERE id_ruta = $1
  `,
  createRoute: `
    INSERT INTO rutas (
      tecnico_responsable,
      tecnico,
      tecnico_asistente,
      fecha
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `,
  updateRoute: `
    UPDATE rutas
    SET
      tecnico_responsable = $1,
      tecnico = $2,
      tecnico_asistente = $3,
      fecha = $4
    WHERE id_ruta = $5
    RETURNING *
  `,
  deleteRoute: `
    DELETE FROM rutas
    WHERE id_ruta = $1
    RETURNING *
  `
};

module.exports = { routeQueries };
