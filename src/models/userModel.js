const dbConnection = require('../utils/dbConnectionUtil');
const { dbQuery } = require('../utils/dbQueryUtil');
const userQueries = require('../queries/userQueries')

// 1. Crear Usuario
const createUser = async ({ name, email, password, role = "user", privileges = null }) => {
  const values = [name, email, password, role, privileges];
  const result = await dbQuery(userQueries.insertUser, values);
  return result.rows[0];
};

// 2. Ver todos los usuarios (admin)
const getAllUsers = async () => {
  const { rows } = await dbConnection.query(userQueries.getAllUsers);
  return rows;
};

// 3. Eliminar un usuario por ID 
const deleteUserById = async (userId) => {
  const { rows } = await dbConnection.query(userQueries.deleteUserById, [userId]);
  return rows[0];
};

// 4. Obtener usuario por ID
const getUserById = async (userId) => {
  const { rows } = await dbConnection.query(userQueries.getUserById, [userId]);
  return rows[0];
};

// 5. Actualizar usuario por ID
const updateUserById = async ({ name, email, password, role = "user", privileges = null, user_id }) => {
  const values = [name, email, password, role, privileges, user_id];
  const result = await dbQuery(userQueries.updateUserById, values);
  return result.rows[0] || null;
};

// 6. Obtener usuario por Email
const getUserByEmail = async (email) => {
  const { rows } = await dbConnection.query(userQueries.getUserByEmail, [email]);
  return rows[0];
};

// EXPORTS
module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserByEmail
}