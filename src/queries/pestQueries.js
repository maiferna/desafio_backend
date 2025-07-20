const pestQueries = {
    getAllPests: `
    SELECT * FROM plagas
  `,
    getPestById: `
    SELECT * FROM plagas WHERE id_plaga = $1
  `,
    createPest: `
    INSERT INTO plagas (nombre)
    VALUES ($1)
    RETURNING *
  `,
    updatePest: `
    UPDATE plagas
    SET nombre = $1
    WHERE id_plaga = $2
    RETURNING *
  `,
    deletePest: `
    DELETE FROM plagas
    WHERE id_plaga = $1
    RETURNING *
  `
};

module.exports = { pestQueries };
