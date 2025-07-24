const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { validateInput, validateJwt, validateRole } = require("../middlewares/index.js");
const { login, signup, renewToken, logout, getUser } = require("../controllers/authController.js");

// RUTA: signup (solo admin puede crear)
router.post("/signup", [
    validateJwt,
    validateRole("admin"),
    check('name', 'El nombre es obligatorio')
        .notEmpty().isString().withMessage('El formato del nombre no es correcto')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres.'),
    check('email', 'Email inválido').notEmpty()
        .isLength({ min: 2, max: 100 })
        .withMessage('El email debe tener entre 2 y 100 caracteres.')
        .isEmail().withMessage('El formato del email no es correcto'),
    check("password", "Password inválido")
        .isStrongPassword({
            minLength: 8,
            maxLength: 50,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
        })
        .withMessage('La contraseña entre 8 y 50 caracteres, una mayúscula y un número'),
    check('role', 'Rol inválido').isIn(['admin', 'tecnico', 'cliente']),
    check('id_cliente').optional().isInt()
        .isLength({ min: 1, max: 50 })
        .withMessage('La id debe ser un número entero entre 1 y 50 caracteres'),
    validateInput
], signup);

// RUTA: login
router.post("/", [
    check('email', 'Email requerido').notEmpty()
        .isLength({ min: 2, max: 100 })
        .withMessage('El email debe tener entre 2 y 100 caracteres.')
        .isEmail().withMessage('El formato del email no es correcto'),
    check('password', 'Password requerido').notEmpty()
        .isStrongPassword({
            minLength: 8,
            maxLength: 50,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
        })
        .withMessage('La contraseña entre 8 y 50 caracteres, una mayúscula y un número'),
    validateInput
], login);

// RUTA: renovar token
router.get("/renewToken", [
    validateJwt
], renewToken);

// RUTA: logout
router.post("/logout", logout);

// RUTA: obtener perfil
router.get("/user", [
    validateJwt
], getUser);

module.exports = router;
