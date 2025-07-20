const clientQueries = {
    getAllClients: `SELECT * FROM clientes`,
    getClientById: `SELECT * FROM clientes WHERE id_cliente = $1`,
    createClient: `
        INSERT INTO clientes (nombre)
        VALUES ($1)
        RETURNING *`,
    updateClient: `
        UPDATE clientes
        SET nombre = $1
        WHERE id_cliente = $2
        RETURNING *`,
    deleteClient: `DELETE FROM clientes WHERE id_cliente = $1 RETURNING *`,
    getClientInstallations: `SELECT * FROM instalaciones WHERE id_cliente = $1`,
};

module.exports = { clientQueries };
