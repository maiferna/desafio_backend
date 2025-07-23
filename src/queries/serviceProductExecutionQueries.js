const serviceProductExecutionQueries = {
  getAllServiceProductExecutions: `
    SELECT * FROM ejecucion_productos
  `,
  getServiceProductExecutionById: `
    SELECT * FROM ejecucion_productos WHERE id_ejecucion_producto = $1
  `,
  getServiceProductExecutionsByServiceExecutionId: `
    SELECT * FROM ejecucion_productos WHERE id_ejecucion_servicio = $1
  `,
  createServiceProductExecution: `
    INSERT INTO ejecucion_productos (id_ejecucion_servicio, id_producto, cantidad)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
  updateServiceProductExecution: `
    UPDATE ejecucion_productos
    SET id_ejecucion_servicio = $1,
        id_producto = $2,
        cantidad = $3
    WHERE id_ejecucion_producto = $4
    RETURNING *
  `,
  deleteServiceProductExecution: `
    DELETE FROM ejecucion_productos
    WHERE id_ejecucion_producto = $1
    RETURNING *
  `
};

module.exports = { serviceProductExecutionQueries };
