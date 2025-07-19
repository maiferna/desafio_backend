const {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserByEmail
} = require("../models/userModel");

// 1. Ver todos los usuarios
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
const putUserByIdController = async (req, res) => {
    try {
        const id_usuario = Number(req.params.id_usuario);
        if (isNaN(id_usuario)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const { id_cliente, nombre, email, password_hash, role } = req.body;

        const updatedUser = await updateUserById({
            id_usuario,
            id_cliente,
            nombre,
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

// EXPORTS
module.exports = {
    getUsersController,
    getUserByIdController,
    putUserByIdController,
    deleteUserByIdController,
    getUserByEmailController
};
