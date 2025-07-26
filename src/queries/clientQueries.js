const clientQueries = {
    getAllClients: `SELECT * FROM clientes`,
    getClientById: `SELECT * FROM clientes WHERE id_cliente = $1`,
    createClient: `
        INSERT INTO clientes (nombre, email, tel, direccion, sector)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
    updateClient: `
        UPDATE clientes
        SET nombre = $1, email = $2, tel = $3, direccion = $4, sector = $5
        WHERE id_cliente = $6
        RETURNING *`,
    deleteClient: `DELETE FROM clientes WHERE id_cliente = $1 RETURNING *`,
    getClientInstallations: `SELECT * FROM instalaciones WHERE id_cliente = $1`,
};

module.exports = { clientQueries };