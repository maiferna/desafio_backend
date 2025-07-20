const bcrypt = require("bcryptjs");

const dbConnection = require('../utils/dbConnectionUtil');
const { dbQuery } = require('../utils/dbQueryUtil');
const {
  userQueries
} = require('../queries/userQueries')

// 1. Crear Usuario
const createUser = async ({ id_cliente = null, nombre, email, password_hash, role }) => {
  const values = [id_cliente, nombre, email, password_hash, role];
  const result = await dbQuery(userQueries.insertUser, values);
  return result.rows[0];
};

// 2. Ver todos los usuarios (admin)
const getAllUsers = async () => {
  const { rows } = await dbQuery(userQueries.getAllUsers);
  return rows;
};

// 3. Eliminar un usuario por ID 
const deleteUserById = async (id_usuario) => {
  const { rows } = await dbQuery(userQueries.deleteUserById, [id_usuario]);
  return rows[0];
};

// 4. Obtener usuario por ID
const getUserById = async (id_usuario) => {
  const { rows } = await dbQuery(userQueries.getUserById, [id_usuario]);
  return rows[0];
};

// 5. Actualizar usuario por ID
const updateUserById = async ({ id_cliente, nombre, email, password_hash, role, id_usuario }) => {
  const values = [id_cliente, nombre, email, password_hash, role, id_usuario];
  const result = await dbQuery(userQueries.updateUserById, values);
  return result.rows[0] || null;
};

// 6. Obtener usuario por Email
const getUserByEmail = async (email) => {
  const { rows } = await dbQuery(userQueries.getUserByEmail, [email]);
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