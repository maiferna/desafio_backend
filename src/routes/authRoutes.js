const express = require('express');
const router = express.Router();
const { validateInput, validateJwt, validateRole} = require("../middlewares/index.js");
const { login, signup, renewToken, logout } = require("../controllers/authController.js");

// ROUTE: signup
// POST http://localhost:3000/api/v1/auth/signup
router.post("/signup", [
    validateInput
], signup)

// ROUTE: login
// POST http://localhost:3000/api/v1/auth
router.post("/", [
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

// // ROUTE: validate admin role
// // GET http://localhost:5000/api/v1/auth/private
// router.get("/private", [
//     validateJWT,
//     validateRole("Admin")
// ], login)

module.exports = router;