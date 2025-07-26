const { dbQuery } = require('../utils/dbQueryUtil');
const { visitQueries } = require('../queries/visitQueries');

/**
 * Recive todas las visitas
 * @returns todas las visitas
 */
const getAllVisits = async () => {
    const res = await dbQuery(visitQueries.getAllVisits);
    return res.rows;
};

/**
 * Recive la visita por id
 * @param {Number} id id de la visita
 * @returns la visita por id
 */
const getVisitById = async (id) => {
    const res = await dbQuery(visitQueries.getVisitById, [id]);
    return res.rows[0];
};

/**
 * Recive la visita por id de instalacion
 * @param {Number} installationId id de la instalación
 * @returns la visita por id de instalacion
 */
const getVisitsByInstallationId = async (installationId) => {
    const res = await dbQuery(visitQueries.getVisitsByInstallationId, [installationId]);
    return res.rows;
};

/**
 * Recive la visita por id de ruta
 * @param {Number} routeId id de la ruta
 * @returns la visita por el id de la ruta
 */
const getVisitsByRouteId = async (routeId) => {
    const res = await dbQuery(visitQueries.getVisitsByRouteId, [routeId]);
    return res.rows;
};
/**
 * Actualizar la visita
 * @param {Number} id_instalacion id de la instalacion
 * @param {Number} id_ruta id de la ruta
 * @param {String} estado el estado de la visita
 * @param {Number} id id de la visita
 * @returns la visita actualizada
 */
const editVisitById = async (id_instalacion, id_ruta, estado, id) => {
    const res = await dbQuery(visitQueries.editVisitById, [id_instalacion, id_ruta, estado, id]);
    return res.rows[0];
};
const createVisit = async ({ id_instalacion, id_ruta, estado }) => {
    const res = await dbQuery(visitQueries.createVisit, [
        id_instalacion,
        id_ruta,
        estado,
    ]);
    return res.rows[0];
};

/**
 * Cambiar el estado de una visita
 * @param {String} estado estado de una visita
 * @param {Number} id_visita id de una visita
 * @returns la visita con el estado cambiado
 */
const updateVisitStatus = async (estado, id_visita) => {
    const res = await dbQuery(visitQueries.updateVisitStatus, [estado, id_visita]);
    return res.rows[0];
};

/**
 * Elimina una visita
 * @param {Number} id id de la visita
 * @returns la visita eliminada
 */
const deleteVisit = async (id) => {
    const res = await dbQuery(visitQueries.deleteVisit, [id]);
    return res.rows[0];
};

/**
 * Cambia la ruta de una visita
 * @param {Number} routeId id de la ruta
 * @param {Number} visitId id de la visita
 * @returns la ruta de la visita cambiada
 */
const setVisitRoute = async (routeId, visitId) => {
    const res = await dbQuery(visitQueries.setVisitRoute, [routeId, visitId]);
    return res.rows[0];
};

/**
 * Recive los detalles de la visita por id
 * @param {Number} id id de la visita
 * @returns el los detalles de la visita
 */
const getVisitDetailsById = async (id) => {
    const res = await dbQuery(visitQueries.getVisitDetailsById, [id]);
    return res.rows;
};

/**
 * Recive las visitas de servicio de ejecucion por id
 * @param {Number} id de visita
 * @returns las visitas de servicio de ejecucion
 */
const getVisitServiceExecutionsById = async (id) => {
    const res = await dbQuery(visitQueries.getVisitServiceExecutionById, [id]);
    return res.rows;
};
module.exports = {
    getAllVisits,
    getVisitById,
    getVisitsByInstallationId,
    getVisitsByRouteId,
    createVisit,
    updateVisitStatus,
    deleteVisit,
    setVisitRoute,
    getVisitDetailsById,
    getVisitServiceExecutionsById,
    editVisitById
};