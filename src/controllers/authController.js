const bcrypt = require("bcryptjs");
const {
    createUser,
    getUserById,
    getUserByEmail
} = require("../models/userModel");
const { generateJwt } = require("../utils/JwtGenerate");

// CONTROLLER: 1. Registro API
/**
 * Registra a un usuario
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje y datos del usuario.
 * Si sale mal, un ok: false y un mensaje
 */
const signup = async (req, res) => {
    const { name, email, password, role, id_cliente } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(403).json({
                ok: false,
                error: "El usuario ya existe"
            });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario con campos correctos
        const newUser = await createUser({
            nombre: name, // nombre real del campo en base de datos
            email,
            password_hash: hashedPassword,
            role,
            id_cliente: role === 'cliente' ? id_cliente : null
        });

        // Respuesta con usuario y token
        res.status(201).json({
            ok: true,
            message: "Usuario registrado con éxito",
            user: {
                id: newUser.id_usuario,
                role: newUser.role,
                name: newUser.nombre,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log("Error en registro:", error);
        return res.status(500).json({
            ok: false,
            error: "Error interno del servidor"
        });
    }
};

// CONTROLLER: 2. Login API
/**
 * Logea a un usuario
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos del usuario y el token JWT.
 * Si sale mal, un ok: false y un mensaje
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                error: "Usuario o contraseña incorrecta"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({
                ok: false,
                error: "Usuario o contraseña incorrecta"
            });
        }

        const token = await generateJwt({
            uid: user.id_usuario,
            email: user.email,
            role: user.role
        });

        // Guardar token en cookie httpOnly
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 1000 * 60 * 60, // 1 hora
        });

        return res.status(200).json({
            ok: true,
            message: "Login correcto",
            user: {
                id: user.id_usuario,
                role: user.role,
                name: user.nombre,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Error en login:", error);
        return res.status(500).json({
            ok: false,
            error: "Error interno del servidor"
        });
    }
};

// CONTROLLER: 3. Renovar token
/**
 * Renueva el JWT a un usuario
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true y un nuevo token JWT.
 * Si sale mal, un ok: false y un mensaje
 */
const renewToken = async (req, res) => {
    try {
        const token = await generateJwt({
            email: req.tokenEmail,
            role: req.role
        });

        return res.status(200).json({
            ok: true,
            token
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al renovar el token'
        });
    }
};

// CONTROLLER: 4. Logout API
/**
 * Deslogear un usuario
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true y elimina el token.
 * Si sale mal, un ok: false y un mensaje
 */
const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Sesión cerrada con éxito" });
};

/**
 * Recoge a un usuario
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true y muestra el usuario.
 * Si sale mal, un ok: false y un mensaje
 */
const getUser = async (req, res) => {
    try {
        const user = await getUserById(req.uid);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado."
            })
        }
        return res.status(200).json({
            ok: true,
            user: {
                id: user.id_usuario,
                name: user.nombre,
                role: user.role,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error del servidor.'
        })
    }
}

// EXPORTS

module.exports = {
    login,
    signup,
    renewToken,
    logout,
    getUser
}