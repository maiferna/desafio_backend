const bcrypt = require("bcryptjs");
const {
    createUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserByEmail
} = require("../models/userModel");
const { generateJwt } = require("../utils/JwtGenerate");

// CONTROLLER: 1. Registro API
const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: "El usuario ya existe" });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario con campos correctos
        const newUser = await createUser({
            nombre: name, // nombre real del campo en base de datos
            email,
            password_hash: hashedPassword,
            role
        });

        // Generar token JWT
        const token = await generateJwt({
            uid: newUser.id_usuario,
            email: newUser.email,
            role: newUser.role
        });

        // Respuesta con usuario y token
        res.status(201).json({
            message: "Usuario registrado con éxito",
            token,
            user: {
                id: newUser.id_usuario,
                role: newUser.role,
                name: newUser.nombre,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log("Error en registro:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

// CONTROLLER: 2. Login API
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y password son obligatorios.' });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Usuario o contraseña incorrecta" });
        }

        if (!user?.password_hash) {
            return res.status(400).json({ error: "Faltan datos para comprobar la contraseña." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Usuario o contraseña incorrecta" });
        }

        const token = await generateJwt({
            uid: user.id_usuario,
            email: user.email,
            role: user.role
        });

        return res.status(200).json({
            message: "Login correcto",
            token,
            user: {
                id: user.id_usuario,
                role: user.role,
                name: user.nombre,
                email: user.email
            }
        });

    } catch (error) {
        console.log("Error en login:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

// CONTROLLER: 3. Renovar token
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
const logout = (req, res) => {
    return res.status(200).json({ message: "Logout correcto" });
};

module.exports = {
    login,
    signup,
    renewToken,
    logout
};
