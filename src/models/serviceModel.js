const { dbQuery } = require('../utils/dbQueryUtil');
const { serviceQueries } = require('../queries/serviceQueries');

/**
 * Recivir todos los servicios
 * @returns todos los servicios
 */
const getAllServices = async () => {
    const res = await dbQuery(serviceQueries.getAllServices);
    return res.rows;
};

/**
 * Recivir un servicio por id
 * @param {Number} id id de servicio
 * @returns servicio por id
 */
const getServiceById = async (id) => {
    const res = await dbQuery(serviceQueries.getServiceById, [id]);
    return res.rows[0];
};

/**
 * Crea un nuevo servicio
 * @param {*} param0 campos para crear un servicio
 * @returns el servicio creado
 */
const createService = async ({ nombre, descripcion, datos }) => {
    const res = await dbQuery(serviceQueries.createService, [nombre, descripcion, datos]);
    return res.rows[0];
};

/**
 * Actualiza un servicio
 * @param {Number} id id del servicio
 * @param {*} param1 Campos para crear el servicio
 * @returns el servicio actualizado
 */
const updateServiceById = async (id, { nombre, descripcion, datos }) => {
    const res = await dbQuery(serviceQueries.updateServiceById, [nombre, descripcion, datos, id]);
    return res.rows[0];
};

/**
 * Elimina un servicio
 * @param {Number} id id del servicio
 * @returns el servicio eliminado
 */
const deleteServiceById = async (id) => {
    const res = await dbQuery(serviceQueries.deleteServiceById, [id]);
    return res.rows[0];
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateServiceById,
    deleteServiceById,
};
