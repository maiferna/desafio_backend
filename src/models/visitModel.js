const { dbQuery } = require('../utils/dbQueryUtil');
const { visitQueries } = require('../queries/visitQueries');

const getAllVisits = async () => {
    const res = await dbQuery(visitQueries.getAllVisits);
    return res.rows;
};

const getVisitById = async (id) => {
    const res = await dbQuery(visitQueries.getVisitById, [id]);
    return res.rows[0];
};

const getVisitsByInstallationId = async (installationId) => {
    const res = await dbQuery(visitQueries.getVisitsByInstallationId, [installationId]);
    return res.rows;
};

const getVisitsByRouteId = async (routeId) => {
    const res = await dbQuery(visitQueries.getVisitsByRouteId, [routeId]);
    return res.rows;
};

const createVisit = async ({ id_instalacion, id_ruta, estado }) => {
    const res = await dbQuery(visitQueries.createVisit, [
        id_instalacion,
        id_ruta,
        estado,
    ]);
    return res.rows[0];
};

const updateVisitStatus = async (estado, id_visita) => {
    const res = await dbQuery(visitQueries.updateVisitStatus, [estado, id_visita]);
    return res.rows[0];
};

const deleteVisit = async (id) => {
    const res = await dbQuery(visitQueries.deleteVisit, [id]);
    return res.rows[0];
};
const setVisitRoute = async (routeId, visitId) => {
    const res = await dbQuery(visitQueries.setVisitRoute, [routeId, visitId]);
    return res.rows[0];
};


module.exports = {
    getAllVisits,
    getVisitById,
    getVisitsByInstallationId,
    getVisitsByRouteId,
    createVisit,
    updateVisitStatus,
    deleteVisit,
    setVisitRoute
};
