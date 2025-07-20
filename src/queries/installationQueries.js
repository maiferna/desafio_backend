const installationQueries = {
    getAllInstallations: `SELECT * FROM instalaciones`,
    getInstallationById: `SELECT * FROM instalaciones WHERE id_instalacion = $1`,
    getInstallationsByClientId: `SELECT * FROM instalaciones WHERE id_cliente = $1`,
    createInstallation: `
        INSERT INTO instalaciones (id_cliente, direccion)
        VALUES ($1, $2)
        RETURNING *`,
    updateInstallation: `
        UPDATE instalaciones
        SET id_cliente = $1, direccion = $2
        WHERE id_instalacion = $3
        RETURNING *`,
    deleteInstallation: `DELETE FROM instalaciones WHERE id_instalacion = $1 RETURNING *`,
};

module.exports = { installationQueries };
