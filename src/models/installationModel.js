const { dbQuery } = require('../utils/dbQueryUtil');
const { installationQueries } = require('../queries/installationQueries');

const getAllInstallations = async () => {
    const res = await dbQuery(installationQueries.getAllInstallations);
    return res.rows;
};

const getInstallationById = async (id) => {
    const res = await dbQuery(installationQueries.getInstallationById, [id]);
    return res.rows[0];
};

const getInstallationsByClientId = async (clientId) => {
    const res = await dbQuery(installationQueries.getInstallationsByClientId, [clientId]);
    return res.rows;
};

const createInstallation = async ({ id_cliente, direccion, nombre, latitud, longitud, puntos_control, image, localidad}) => {
    const res = await dbQuery(installationQueries.createInstallation, [id_cliente, direccion, nombre, latitud, longitud, puntos_control, image, localidad]);
    return res.rows[0];
};

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
