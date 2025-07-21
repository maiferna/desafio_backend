const visitQueries = {
    getAllVisits: `SELECT * FROM visitas`,
    getVisitById: `SELECT * FROM visitas WHERE id_visita = $1`,
    getVisitsByInstallationId: `SELECT * FROM visitas WHERE id_instalacion = $1`,
    getVisitsByRouteId: `SELECT * FROM visitas WHERE id_ruta = $1`,
    createVisit: `
        INSERT INTO visitas (id_instalacion, id_ruta, estado)
        VALUES ($1, $2, $3)
        RETURNING *`,
    updateVisitStatus: `
        UPDATE visitas
        SET estado = $1
        WHERE id_visita = $2
        RETURNING *`,
    deleteVisit: `DELETE FROM visitas WHERE id_visita = $1 RETURNING *`,
    setVisitRoute: `
    UPDATE visitas
    SET id_ruta = $1
    WHERE id_visita = $2
    RETURNING *`,
};

module.exports = { visitQueries };
