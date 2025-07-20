const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { validateInput, validateJwt, validateRole } = require("../middlewares/index.js");
const { login, signup, renewToken, logout, getUser } = require("../controllers/authController.js");

// RUTA: signup (solo admin puede crear)
router.post("/signup", [
    validateJwt,
    validateRole("admin"),
    check('name', 'El nombre es obligatorio').notEmpty().isString().isLength({ min: 2, max: 100 }),
    check('email', 'Email inválido').notEmpty().isEmail(),
    check("password", "La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número")
        .isStrongPassword({
            minLength: 8,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
        }),
    check('role', 'Rol inválido').isIn(['admin', 'tecnico', 'cliente']),
    check('id_cliente').optional().isInt().withMessage('id_cliente debe ser un número'),
    validateInput
], signup);

// RUTA: login
router.post("/", [
    check('email', 'Email requerido').notEmpty().isEmail(),
    check('password', 'Password requerido').notEmpty(),
    validateInput
], login);

// RUTA: renovar token
router.get("/renewToken", [
    validateJwt
], renewToken);

// RUTA: logout
router.get("/logout", logout);

// RUTA: obtener perfil
router.get("/user", [
    validateJwt
], getUser);

module.exports = router;
