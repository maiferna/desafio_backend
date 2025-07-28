const { dbQuery } = require('../utils/dbQueryUtil');
const { installationQueries } = require('../queries/installationQueries');

/**
 * Recive todas las instalaciones
 * @returns todas las instalaciones
 */
const getAllInstallations = async () => {
    const res = await dbQuery(installationQueries.getAllInstallations);
    return res.rows;
};

/**
 * Recive las instalaciones por id
 * @param {Number} id id de la instalacion
 * @returns instalaciones del id
 */
const getInstallationById = async (id) => {
    const res = await dbQuery(installationQueries.getInstallationById, [id]);
    return res.rows[0];
};

/**
 * Recive todas las instalaciones por el id del cliente
 * @param {Number} clientId id del cliente
 * @returns las instaciones del cliente
 */
const getInstallationsByClientId = async (clientId) => {
    const res = await dbQuery(installationQueries.getInstallationsByClientId, [clientId]);
    return res.rows;
};

/**
 * Crear una nueva instalacion
 * @param {*} param0 campos para crear la instalacion
 * @returns la instalacion creada
 */
const createInstallation = async ({ id_cliente, direccion, nombre, latitud, longitud, puntos_control, image, localidad}) => {
    const res = await dbQuery(installationQueries.createInstallation, [id_cliente, direccion, nombre, latitud, longitud, puntos_control, image, localidad]);
    return res.rows[0];
};

/**
 * Actualizar una instalacion
 * @param {Number} id id de la instalacion
 * @param {*} param1 campos para actualizar una instalacion
 * @returns la instalacion actualizada
 */
const updateInstallation = async (id, { id_cliente, direccion, nombre, localidad, puntos_control, image }) => {
    const res = await dbQuery(installationQueries.updateInstallation, [
        id_cliente,
        direccion,
        id,
        nombre,
        localidad,
        puntos_control,
        image
    ]);
    return res.rows[0];
};

/**
 * Eliminar una instalacion 
 * @param {Number} id id de la instalacion a eliminar
 * @returns la instalacion eliminada
 */
const deleteInstallation = async (id) => {
    const res = await dbQuery(installationQueries.deleteInstallation, [id]);
    return res.rows[0];
};

module.exports = {
    getAllInstallations,
    getInstallationById,
    getInstallationsByClientId,
    createInstallation,
    updateInstallation,
    deleteInstallation,
};
