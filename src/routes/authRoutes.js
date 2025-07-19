const express = require('express');
const router = express.Router();
const { validateInput, validateJwt, validateRole} = require("../middlewares/index.js");
const { login, signup, renewToken, logout, getUser } = require("../controllers/authController.js");
const { check } = require('express-validator');

// ROUTE: signup
// POST http://localhost:3000/api/v1/auth/signup
router.post("/signup", [
    check('name', 'name es requerido').notEmpty().isString(),
    check('email', 'email es requerido').notEmpty().isEmail(),
    check('password', 'password es requerido').notEmpty().isString(),
    validateInput
], signup)

// ROUTE: login
// POST http://localhost:3000/api/v1/auth/login
router.post("/", [
    check('email', 'email requerido').notEmpty().isEmail(),
    check('password', 'password requerido').notEmpty().isString(),
    validateInput
], login)

// ROUTE: renewtoken
// GET http://localhost:3000/api/v1/auth/renewtoken
router.get("/renewToken", [
    validateJwt
], renewToken)

// ROUTE: logout
// GET http://localhost:3000/api/v1/auth/logout
router.get("/logout", logout);

// ROUTE: getUser
// GET http://localhost:3000/api/v1/auth/logout
router.get("/user", getUser);

// // ROUTE: validate admin role
// // GET http://localhost:5000/api/v1/auth/private
// router.get("/private", [
//     validateJWT,
//     validateRole("Admin")
// ], login)


// **** PRUEBAS ******
// router.post('/auth', (req, res) => {
//   const { email, name} = req.body;
//   console.log('EMAIL RECIBIDO DEL FRONT', email)
//   console.log('NAME DEL FRONT', name)

//   const fakeUser = {
//     uid: '1234',
//     name: name || 'Usuario de prueba',
//     email: email || 'fake@correo.com',
//     role: 'client', // Puedes cambiar a admin o technician si quieres probar
//   };

//   const fakeToken = 'FAKE_TOKEN';

//   return res.status(200).json({
//     user: fakeUser,
//     token: fakeToken,
//   });
// });

// // Endpoint para validar token y cargar user
// router.get('/auth', (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Token no proporcionado' });
//   }

//   const token = authHeader.split(' ')[1];
//   console.log('TOKEN', token)

//   if (token !== 'FAKE_TOKEN') {
//     return res.status(401).json({ message: 'Token inválido' });
//   }

//   const fakeUser = {
//     uid: '1234',
//     name: 'Usuario de prueba',
//     email: 'fake@correo.com',
//     role: 'client',
//   };

//   return res.status(200).json({ user: fakeUser });
// });

module.exports = router;