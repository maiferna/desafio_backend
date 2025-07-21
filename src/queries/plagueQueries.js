const plagueQueries = {
  getAllPlagues: `
        SELECT * FROM plagas
    `,
  getPlagueById: `
        SELECT * FROM plagas WHERE id_plaga = $1
    `,
  createPlague: `
        INSERT INTO plagas (nombre)
        VALUES ($1)
        RETURNING *
    `,
  updatePlague: `
        UPDATE plagas
        SET nombre = $1
        WHERE id_plaga = $2
        RETURNING *
    `,
  deletePlague: `
        DELETE FROM plagas
        WHERE id_plaga = $1
        RETURNING *
    `
};

module.exports = { plagueQueries };
