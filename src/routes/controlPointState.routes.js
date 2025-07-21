const express = require('express');
const router = express.Router();
const {
    getAllControlPointStatesController,
    getControlPointStateByIdController,
    createControlPointStateController,
    updateControlPointStateController,
    deleteControlPointStateController
} = require('../controllers/controlPointStateController');

const { check } = require("express-validator");
const { validateJwt, validateRole, validateInput } = require("../middlewares/index.js");

// Middleware común solo para admins
const adminAccess = [validateJwt, validateRole("admin")];

// GET /api/v1/control-point-states
router.get('/', [
    adminAccess
], getAllControlPointStatesController);

// GET /api/v1/control-point-states/:id
router.get('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], getControlPointStateByIdController);

// POST /api/v1/control-point-states
router.post('/', [
    check("nombre", "nombre invalido")
        .notEmpty()
        .withMessage('nombre esta vacio'),
    check("color", "color invalido")
        .notEmpty()
        .withMessage('color esta vacio'),
    validateInput,
    ...adminAccess
], createControlPointStateController);

// PUT /api/v1/control-point-states/:id
router.put('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("nombre", "nombre invalido")
        .notEmpty()
        .withMessage('nombre esta vacio'),
    check("color", "color invalido")
        .notEmpty()
        .withMessage('color esta vacio'),
    validateInput,
    ...adminAccess
], updateControlPointStateController);

// DELETE /api/v1/control-point-states/:id
router.delete('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], deleteControlPointStateController);

module.exports = router;
