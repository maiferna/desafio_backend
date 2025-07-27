const visitQueries = {
    getAllVisits: `SELECT 
        v.*, 
        i.localidad, 
        i.latitud AS lat, 
        i.longitud AS lon
        FROM visitas v
        JOIN instalaciones i ON v.id_instalacion = i.id_instalacion;`,
    getVisitById: `SELECT * FROM visitas WHERE id_visita = $1`,
    getVisitsByInstallationId: `SELECT * FROM visitas WHERE id_instalacion = $1`,
    getVisitsByRouteId: `SELECT * FROM visitas WHERE id_ruta = $1`,
    editVisitById: `
        UPDATE visitas
        SET
        id_instalacion = $1,
        id_ruta = $2,
        estado = $3
        WHERE id_visita = $4
        RETURNING *;`,
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
    getVisitDetailsById: `SELECT
        v.id_visita as id_visita,
        s.nombre AS servicio,
        s.id_servicio AS id_servicio,
        i.direccion AS direccion_instalacion,
        c.nombre AS cliente,
        i.id_instalacion AS id_instalacion
        FROM visitas v
        JOIN instalaciones i ON v.id_instalacion = i.id_instalacion
        JOIN clientes c ON i.id_cliente = c.id_cliente
        JOIN ejecuciones_servicios es ON es.id_visita = v.id_visita
        JOIN servicios s ON s.id_servicio = es.id_servicio
        WHERE v.id_visita = $1;
        `,
    getVisitServiceExecutionById: `
    SELECT *
    FROM ejecuciones_servicios
    WHERE id_visita = $1;
    `,
    unassignVisitsFromRoute: `
  UPDATE visitas
  SET id_ruta = NULL
  WHERE id_ruta = $1
`,

    getVisitsByWorkerId: `
SELECT
  v.id_visita,
  v.estado,
  v.id_ruta,
  v.id_instalacion,
  i.latitud,
  i.longitud,
  i.direccion,
  c.nombre AS cliente
FROM visitas v
JOIN rutas r ON v.id_ruta = r.id_ruta
JOIN instalaciones i ON v.id_instalacion = i.id_instalacion
JOIN clientes c ON i.id_cliente = c.id_cliente
WHERE r.tecnico_responsable = $1
   OR r.tecnico = $1
   OR r.tecnico_asistente = $1;
`
};

module.exports = { visitQueries };