/**
 * Queries de servicios de ejecucion
 */
const serviceExecutionQueries = {
  getAllServiceExecutions: `SELECT * FROM ejecuciones_servicios`,
  getServiceExecutionById: `SELECT * FROM ejecuciones_servicios WHERE id_ejecucion_servicio = $1`,
  getServiceExecutionsByVisitId: `SELECT * FROM ejecuciones_servicios WHERE id_visita = $1`,
  createServiceExecution: `
      INSERT INTO ejecuciones_servicios 
      (id_visita, id_servicio, observaciones, datos) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
  updateServiceExecutionById: `
      UPDATE ejecuciones_servicios 
      SET id_visita = $1, id_servicio = $2, observaciones = $3, datos = $4 
      WHERE id_ejecucion_servicio = $5 
      RETURNING *`,
  deleteServiceExecutionById: `DELETE FROM ejecuciones_servicios WHERE id_ejecucion_servicio = $1 RETURNING *`,
};

module.exports = { serviceExecutionQueries };
