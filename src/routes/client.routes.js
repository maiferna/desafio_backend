const express = require("express");
const router = express.Router();
const {
    getAllClientsHandler,
    getClientByIdHandler,
    createClientHandler,
    updateClientHandler,
    deleteClientHandler,
    getClientInstallationsHandler,
} = require("../controllers/clientController");

const { check } = require("express-validator");
const { validateJwt, validateRole, validateInput } = require("../middlewares/index.js");

// GET /api/v1/clients
router.get("/", [
    validateJwt,
    validateRole("admin"),
], getAllClientsHandler);

// GET /api/v1/clients/:id
router.get("/:id", [
    validateJwt,
    validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 10000 })
        .withMessage('La id debe ser un numero entero como minimo 1 y maximo de 10000'),
    validateInput,
], getClientByIdHandler);

// POST /api/v1/clients
router.post("/", [
    validateJwt,
    validateRole("admin"),
    check("nombre", "nombre invalido")
        .notEmpty()
        .isLength({ min: 1, max: 100 })
        .withMessage('El campo debe tener entre 1 y 100 caracteres')
        .withMessage('nombre esta vacio'),
    validateInput,
], createClientHandler);

// PUT /api/v1/clients/:id
router.put("/:id", [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("nombre", "nombre invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('El campo debe tener entre 1 y 100 caracteres'),
    validateInput,
], updateClientHandler);

// DELETE /api/v1/clients/:id
router.delete("/:id", [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], deleteClientHandler);

// GET /api/v1/clients/:id/installations
router.get("/:id/installations", [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], getClientInstallationsHandler);

module.exports = router;