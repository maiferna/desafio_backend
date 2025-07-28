const { dbQuery } = require('../utils/dbQueryUtil');
const { clientQueries } = require('../queries/clientQueries');

/**
 * Recive todos los clientes
 * @returns todos los clientes
 */
const getAllClients = async () => {
    const res = await dbQuery(clientQueries.getAllClients);
    return res.rows;
};

/**
 * Recive un cliente por id
 * @param {Number} id id del cliente
 * @returns cliente con el id
 */
const getClientById = async (id) => {
    const res = await dbQuery(clientQueries.getClientById, [id]);
    return res.rows[0];
};

/**
 * Crea un cliente
 * @param {Number} param0 campos para crear al cliente
 * @returns cliente creado
 */
const createClient = async ({ nombre, email, tel, direccion, sector }) => {
    const res = await dbQuery(clientQueries.createClient, [nombre, email, tel, direccion, sector]);
    return res.rows[0];
};

/**
 * Actualiza al cliente por id
 * @param {Number} id id del cliente
 * @param {*} param1 
 * @returns cliente actualizado
 */
const updateClient = async (id, { nombre, email, tel, direccion, sector }) => {
    const res = await dbQuery(clientQueries.updateClient, [nombre, email, tel, direccion, sector, id]);
    return res.rows[0];
};

/**
 * Elimina un cliente
 * @param {Number} id id del cliente
 * @returns cliente eliminado
 */
const deleteClient = async (id) => {
    const res = await dbQuery(clientQueries.deleteClient, [id]);
    return res.rows[0];
};

/**
 * Recive las instalaciones del cliente
 * @param {Number} clientId id del cliente
 * @returns instalaciones del cliente
 */
const getClientInstallations = async (clientId) => {
    const res = await dbQuery(clientQueries.getClientInstallations, [clientId]);
    return res.rows;
};

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    getClientInstallations,
};
