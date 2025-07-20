// QUERIES: usuarios
const userQueries = {

  // QUERIE: 1. Crear usuario
  insertUser: `
        INSERT INTO usuarios (id_cliente, nombre, email, password_hash, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `,

  // QUERIE: 2. Obtener todos los usuarios y sus datos
  getAllUsers: `
        SELECT id_usuario, id_cliente, nombre, email, role
        FROM usuarios
        ORDER BY id_usuario ASC;
    `,

  // QUERIE: 3. Eliminar usuario por ID
  deleteUserById: `
        DELETE FROM usuarios
        WHERE id_usuario = $1
        RETURNING *;
    `,

  // QUERIE: 4. Obtener usuario por ID
  getUserById: `
        SELECT id_usuario, id_cliente, nombre, email, role
        FROM usuarios
        WHERE id_usuario = $1;
    `,

  // QUERIE: 5. Editar usuario por ID
  updateUserById: `
    UPDATE usuarios
    SET
      id_cliente = $1,
      nombre = COALESCE($2, nombre),
      email = COALESCE($3, email),
      password_hash = COALESCE($4, password_hash),
      role = COALESCE($5, role)
    WHERE id_usuario = $6
    RETURNING *;
  `,

  // QUERIE: 6. Obtener usuario por email
  getUserByEmail: `
    SELECT id_usuario, id_cliente, nombre, email, role, password_hash
    FROM usuarios
    WHERE email = $1;
  `,
};

module.exports = {
  userQueries
};