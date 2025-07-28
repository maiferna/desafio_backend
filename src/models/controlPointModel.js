const { dbQuery } = require('../utils/dbQueryUtil');
const { controlPointQueries } = require('../queries/controlPointQueries');

/**
 * Recive todos los puntos de control
 * @returns todos los puntos de control
 */
const getAllControlPoints = async () => {
    const res = await dbQuery(controlPointQueries.getAllControlPoints);
    return res.rows;
};

/**
 * Recive el punto de control por id
 * @param {Number} id id del punto de control
 * @returns el punto de control
 */
const getControlPointById = async (id) => {
    const res = await dbQuery(controlPointQueries.getControlPointById, [id]);
    return res.rows[0];
};

/**
 * Recivir puntos de control por id de instalacion
 * @param {Number} installationId id de instalacion
 * @returns puntos de control de una instalacion
 */
const getControlPointsByInstallationId = async (installationId) => {
    const res = await dbQuery(controlPointQueries.getControlPointsByInstallationId, [installationId]);
    return res.rows;
};

/**
 * Crea un nuevo punto de control
 * @param {*} param0 campos para crear un nuevo punto de control
 * @returns punto de control creado
 */
const createControlPoint = async ({
    id_producto,
    id_instalacion,
    id_grupo_punto_control,
    localizacion,
    coordenadas,
}) => {
    const res = await dbQuery(controlPointQueries.createControlPoint, [
        id_producto,
        id_instalacion,
        id_grupo_punto_control,
        localizacion,
        coordenadas,
    ]);
    return res.rows[0];
};

/**
 * Acualiza un punto de control
 * @param {Number} id id del punto de control
 * @param {*} param1 campos para actualizar el punto de control
 * @returns punto de control actualizado
 */
const updateControlPoint = async (
    id,
    { id_producto, id_instalacion, id_grupo_punto_control, localizacion, coordenadas }
) => {
    const res = await dbQuery(controlPointQueries.updateControlPoint, [
        id_producto,
        id_instalacion,
        id_grupo_punto_control,
        localizacion,
        coordenadas,
        id,
    ]);
    return res.rows[0];
};

/**
 * Elimina un punto de control
 * @param {Number} id id del punto de control
 * @returns punto de control eliminado
 */
const deleteControlPoint = async (id) => {
    const res = await dbQuery(controlPointQueries.deleteControlPoint, [id]);
    return res.rows[0];
};

module.exports = {
    getAllControlPoints,
    getControlPointById,
    getControlPointsByInstallationId,
    createControlPoint,
    updateControlPoint,
    deleteControlPoint,
};
