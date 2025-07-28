const { dbQuery } = require('../utils/dbQueryUtil');
const { routeQueries } = require('../queries/routeQueries');
const { visitQueries } = require('../queries/visitQueries');

/**
 * Recive todas las rutas
 * @returns todas las rutas
 */
const getAllRoutes = async () => {
    const res = await dbQuery(routeQueries.getAllRoutes);
    return res.rows;
};

/**
 * Recive la ruta por id
 * @param {Number} id id de la ruta
 * @returns la ruta del id
 */
const getRouteById = async (id) => {
    const res = await dbQuery(routeQueries.getRouteById, [id]);
    return res.rows[0];
};

/**
 * Crea una nueva ruta
 * @param {*} param0 campos para crear la ruta
 * @returns la ruta creada
 */
const createRoute = async ({
    tecnico_responsable,
    tecnico,
    tecnico_asistente,
    fecha
}) => {
    const res = await dbQuery(routeQueries.createRoute, [
        tecnico_responsable,
        tecnico,
        tecnico_asistente,
        fecha
    ]);
    return res.rows[0];
};

/**
 * Actualiza una ruta
 * @param {Number} id id de la ruta
 * @param {*} param1 campos para actualizar una ruta
 * @returns la ruta actualizada
 */
const updateRoute = async (
    id,
    {
        tecnico_responsable,
        tecnico,
        tecnico_asistente,
        fecha
    }
) => {
    const res = await dbQuery(routeQueries.updateRoute, [
        tecnico_responsable,
        tecnico,
        tecnico_asistente,
        fecha,
        id
    ]);
    return res.rows[0];
};

/**
 * Elimina una ruta
 * @param {Number} id id de la ruta
 * @returns la ruta eliminada
 */
const deleteRoute = async (id) => {
    const res = await dbQuery(routeQueries.deleteRoute, [id]);
    return res.rows[0];
};
/**
 * Desvincula una visita de una ruta
 * @param {Number} routeId id de la ruta
 * @returns la ruta
 */
const unassignVisitsFromRoute = async (routeId) => {
    const res = await dbQuery(visitQueries.unassignVisitsFromRoute, [routeId]);
    return res.rowCount;
};

module.exports = {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
    unassignVisitsFromRoute
};