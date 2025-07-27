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

const createClient = async ({ nombre, email, tel, direccion, sector }) => {
    const res = await dbQuery(clientQueries.createClient, [nombre, email, tel, direccion, sector]);
    return res.rows[0];
};

const updateClient = async (id, { nombre, email, tel, direccion, sector  }) => {
    const res = await dbQuery(clientQueries.updateClient, [nombre, email, tel, direccion, sector, id]);
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
