const installationQueries = {
    getAllInstallations: `SELECT * FROM instalaciones`,
    getInstallationById: `SELECT * FROM instalaciones WHERE id_instalacion = $1`,
    getInstallationsByClientId: `SELECT * FROM instalaciones WHERE id_cliente = $1`,
    createInstallation: `
        INSERT INTO instalaciones (id_cliente, nombre, direccion, tipo, datos)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
    updateInstallation: `
        UPDATE instalaciones
        SET id_cliente = $1, nombre = $2, direccion = $3, tipo = $4, datos = $5
        WHERE id_instalacion = $6
        RETURNING *`,
    deleteInstallation: `DELETE FROM instalaciones WHERE id_instalacion = $1 RETURNING *`,
};

module.exports = { installationQueries };
