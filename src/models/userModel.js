const bcrypt = require("bcryptjs");

const dbConnection = require('../utils/dbConnectionUtil');
const { dbQuery } = require('../utils/dbQueryUtil');
const {
  userQueries
} = require('../queries/userQueries')

// 1. Crear Usuario
/**
 * Crear un usuario
 * @param {*} param0 campos para crear un usuario
 * @returns el usuario creado
 */
const createUser = async ({ id_cliente = null, nombre, email, password_hash, role }) => {
  const values = [id_cliente, nombre, email, password_hash, role];
  const result = await dbQuery(userQueries.insertUser, values);
  return result.rows[0];
};

// 2. Ver todos los usuarios (admin)
/**
 * Recive todos los usuarios
 * @returns todos los usuarios
 */
const getAllUsers = async () => {
  const { rows } = await dbQuery(userQueries.getAllUsers);
  return rows;
};

// 3. Eliminar un usuario por ID 
/**
 * Eliminar un usuario
 * @param {Number} id_usuario id del usuario
 * @returns el usuario eliminado
 */
const deleteUserById = async (id_usuario) => {
  const { rows } = await dbQuery(userQueries.deleteUserById, [id_usuario]);
  return rows[0];
};

// 4. Obtener usuario por ID
/**
 * Recivir usuario por id
 * @param {Number} id_usuario id del usuario
 * @returns el usuario por id
 */
const getUserById = async (id_usuario) => {
  const { rows } = await dbQuery(userQueries.getUserById, [id_usuario]);
  return rows[0];
};

// 5. Actualizar usuario por ID
/**
 * Actualiza el usuario
 * @param {*} param0 campos para actualizar el usuario
 * @returns el usuario actualizado
 */
const updateUserById = async ({ id_cliente, nombre, email, password_hash, role, id_usuario }) => {
  const values = [id_cliente, nombre, email, password_hash, role, id_usuario];
  const result = await dbQuery(userQueries.updateUserById, values);
  return result.rows[0] || null;
};

// 6. Obtener usuario por Email
/**
 * Recivir usuario por email
 * @param {String} email email del usuario
 * @returns el usuario por email
 */
const getUserByEmail = async (email) => {
  const { rows } = await dbQuery(userQueries.getUserByEmail, [email]);
  return rows[0];
};


const getUsersByRole = async (role) => {
  const { rows } = await dbQuery(userQueries.getUsersByRole, [role]);
  return rows;
};
// EXPORTS
module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserByEmail,
  getUsersByRole
}