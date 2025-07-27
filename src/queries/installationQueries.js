/**
 * Quieries de instalacion
 */
const installationQueries = {
    getAllInstallations: `SELECT * FROM instalaciones`,
    getInstallationById: `SELECT * FROM instalaciones WHERE id_instalacion = $1`,
    getInstallationsByClientId: `SELECT * FROM instalaciones WHERE id_cliente = $1`,
    createInstallation: `
        INSERT INTO instalaciones (id_cliente, direccion, nombre, latitud, longitud, puntos_control, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
    updateInstallation: `
        UPDATE instalaciones
        SET id_cliente = $1, direccion = $2, nombre = $3, latitud = $4, longitud = $5, puntos_control = $6, image = $7
        WHERE id_instalacion = $8
        RETURNING *`,
    deleteInstallation: `DELETE FROM instalaciones WHERE id_instalacion = $1 RETURNING *`,
};

module.exports = { installationQueries };
