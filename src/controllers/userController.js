const bcrypt = require("bcryptjs");

const {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserByEmail,
    getUsersByRole
} = require("../models/userModel");

// 1. Ver todos los usuarios
/**
 * Recive todos los usuarios
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// 2. Eliminar un usuario por ID
/**
 * Elimina un usuarios por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const deleteUserByIdController = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const deletedUser = await deleteUserById(Number(id_usuario));

        if (!deletedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: "Usuario eliminado",
            data: deletedUser
        });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// 3. Obtener usuario por ID
/**
 * Recive un usuario por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getUserByIdController = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const user = await getUserById(Number(id_usuario));

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// 4. Editar un usuario por ID
/**
 * Editar un usuario por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const putUserByIdController = async (req, res) => {
    try {
        const id_usuario = Number(req.params.id_usuario);
        if (isNaN(id_usuario)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        let { id_cliente, name, email, password, role } = req.body;

        let password_hash = undefined;
        if (password) {
            password_hash = await bcrypt.hash(password, 10);
        }

        // Si el rol no es "cliente", forzamos id_cliente a null
        if (role !== "cliente") {
            id_cliente = null;
        }

        const updatedUser = await updateUserById({
            id_usuario,
            id_cliente,
            nombre: name,
            email,
            password_hash,
            role
        });

        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado o no actualizado" });
        }

        res.status(200).json({
            message: "Usuario actualizado",
            data: updatedUser
        });

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// 5. Obtener usuario por Email
/**
 * Recivir un usuario por email
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getUserByEmailController = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario por email:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const getUsersByRoleController = async (req, res) => {
    try {
        const { role } = req.params;
        const user = await getUsersByRole(role);

        if (!user) {
            return res.status(404).json({ error: "Usuarios no encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario por rol:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// EXPORTS
module.exports = {
    getUsersController,
    getUserByIdController,
    putUserByIdController,
    deleteUserByIdController,
    getUserByEmailController,
    getUsersByRoleController
};
