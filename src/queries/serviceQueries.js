const serviceQueries = {
    getAllServices: `SELECT * FROM servicios`,
    getServiceById: `SELECT * FROM servicios WHERE id_servicio = $1`,
    createService: `INSERT INTO servicios (nombre, descripcion, datos) VALUES ($1, $2, $3) RETURNING *`,
    updateServiceById: `
      UPDATE servicios 
      SET nombre = $1, descripcion = $2, datos = $3 
      WHERE id_servicio = $4 
      RETURNING *`,
    deleteServiceById: `DELETE FROM servicios WHERE id_servicio = $1 RETURNING *`,
};

module.exports = { serviceQueries };
