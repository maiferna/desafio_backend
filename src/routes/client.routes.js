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

// Middleware común solo para admins
const adminAccess = [validateJwt, validateRole("admin")];

// GET /api/v1/clients
router.get("/", [
    adminAccess
], getAllClientsHandler);

// GET /api/v1/clients/:id
router.get("/:id", [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], getClientByIdHandler);

// POST /api/v1/clients
router.post("/", [
    check("nombre", "nombre invalido")
        .notEmpty()
        .withMessage('nombre esta vacio'),
    validateInput,
    ...adminAccess
], createClientHandler);

// PUT /api/v1/clients/:id
router.put("/:id", [
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("nombre", "nombre invalido")
        .notEmpty()
        .withMessage('nombre esta vacio'),
    validateInput,
    ...adminAccess
], updateClientHandler);

// DELETE /api/v1/clients/:id
router.delete("/:id", [
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], deleteClientHandler);

// GET /api/v1/clients/:id/installations
router.get("/:id/installations", [
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], getClientInstallationsHandler);

module.exports = router;