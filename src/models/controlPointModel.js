const { dbQuery } = require('../utils/dbQueryUtil');
const { controlPointQueries } = require('../queries/controlPointQueries');

const getAllControlPoints = async () => {
    const res = await dbQuery(controlPointQueries.getAllControlPoints);
    return res.rows;
};

const getControlPointById = async (id) => {
    const res = await dbQuery(controlPointQueries.getControlPointById, [id]);
    return res.rows[0];
};

const getControlPointsByInstallationId = async (installationId) => {
    const res = await dbQuery(controlPointQueries.getControlPointsByInstallationId, [installationId]);
    return res.rows;
};

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
