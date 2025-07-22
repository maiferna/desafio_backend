const installationQueries = {
    getAllInstallations: `SELECT * FROM instalaciones`,
    getInstallationById: `SELECT * FROM instalaciones WHERE id_instalacion = $1`,
    getInstallationsByClientId: `SELECT * FROM instalaciones WHERE id_cliente = $1`,
    createInstallation: `
        INSERT INTO instalaciones (id_cliente, direccion, nombre, localidad, puntos_control, image)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
    updateInstallation: `
        UPDATE instalaciones
        SET id_cliente = $1, direccion = $2, nombre = $3, localidad = $4, puntos_control = $5, image = $6
        WHERE id_instalacion = $7
        RETURNING *`,
    deleteInstallation: `DELETE FROM instalaciones WHERE id_instalacion = $1 RETURNING *`,
};

module.exports = { installationQueries };
