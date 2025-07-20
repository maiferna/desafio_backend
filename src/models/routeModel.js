const { dbQuery } = require('../utils/dbQueryUtil');
const { routeQueries } = require('../queries/routeQueries');

const getAllRoutes = async () => {
    const res = await dbQuery(routeQueries.getAllRoutes);
    return res.rows;
};

const getRouteById = async (id) => {
    const res = await dbQuery(routeQueries.getRouteById, [id]);
    return res.rows[0];
};

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

const deleteRoute = async (id) => {
    const res = await dbQuery(routeQueries.deleteRoute, [id]);
    return res.rows[0];
};

module.exports = {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute
};
