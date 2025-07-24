const { verifyJwt } = require("../utils/JwtVerify.js")
const { generateJwt } = require("../utils/JwtGenerate")

// MIDDLEWARE: validar JWT (desde cookie httpOnly)
const validateJwt = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No se proporcionó token de autenticación",
        });
    }

    try {
        // 1. Verificar token recibido
        const payload = await verifyJwt(token);

        // 2. Renovar el token
        const renewedToken = await generateJwt({
            uid: payload.uid,
            email: payload.email,
            role: payload.role,
        });

        // 3. Guardar nueva cookie (igual que al hacer login)
        res.cookie("token", renewedToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true en despliegue
            sameSite: "Lax",
            maxAge: 1000 * 60 * 60, // 1h
        });

        // 4. Guardar datos en la request para el resto del backend
        req.uid = payload.uid;
        req.tokenEmail = payload.email;
        req.role = payload.role;

        next();
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(401).json({
            ok: false,
            msg: "Token inválido o expirado",
        });
    }
};

module.exports = validateJwt;
