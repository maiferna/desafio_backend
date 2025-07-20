const { dbQuery } = require('../utils/dbQueryUtil');
const { clientQueries } = require('../queries/clientQueries');

const getAllClients = async () => {
    const res = await dbQuery(clientQueries.getAllClients);
    return res.rows;
};

const getClientById = async (id) => {
    const res = await dbQuery(clientQueries.getClientById, [id]);
    return res.rows[0];
};

const createClient = async ({ nombre, telefono, email, direccion }) => {
    const res = await dbQuery(clientQueries.createClient, [nombre, telefono, email, direccion]);
    return res.rows[0];
};

const updateClient = async (id, { nombre, telefono, email, direccion, nif }) => {
    const res = await dbQuery(clientQueries.updateClient, [nombre, telefono, email, direccion, id]);
    return res.rows[0];
};

const deleteClient = async (id) => {
    const res = await dbQuery(clientQueries.deleteClient, [id]);
    return res.rows[0];
};

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
