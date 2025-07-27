/**
 * Queries de puntos de control
 */
const controlPointQueries = {
    getAllControlPoints: `SELECT * FROM puntos_de_control`,
    getControlPointById: `SELECT * FROM puntos_de_control WHERE id_punto_control = $1`,
    getControlPointsByInstallationId: `SELECT * FROM puntos_de_control WHERE id_instalacion = $1`,
    createControlPoint: `
        INSERT INTO puntos_de_control (
            id_producto,
            id_instalacion,
            id_grupo_punto_control,
            localizacion,
            coordenadas
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
    updateControlPoint: `
        UPDATE puntos_de_control
        SET id_producto = $1,
            id_instalacion = $2,
            id_grupo_punto_control = $3,
            localizacion = $4,
            coordenadas = $5
        WHERE id_punto_control = $6
        RETURNING *`,
    deleteControlPoint: `DELETE FROM puntos_de_control WHERE id_punto_control = $1 RETURNING *`,
};

module.exports = { controlPointQueries };
