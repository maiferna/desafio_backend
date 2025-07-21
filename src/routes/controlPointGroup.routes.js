const express = require('express');
const router = express.Router();
const {
    getAllControlPointGroupsController,
    getControlPointGroupByIdController,
    createControlPointGroupController,
    updateControlPointGroupController,
    deleteControlPointGroupController
} = require('../controllers/controlPointGroupController');

const { check } = require("express-validator");
const { validateJwt, validateRole, validateInput } = require("../middlewares/index.js");

// Middleware común solo para admins
const adminAccess = [validateJwt, validateRole("admin")];

// GET /api/v1/control-point-groups
router.get('/', [
    adminAccess
], getAllControlPointGroupsController);

// GET /api/v1/control-point-groups/:id
router.get('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    adminAccess
], getControlPointGroupByIdController);

// POST /api/v1/control-point-groups
router.post('/', [
    check("nombre", "nombre invalido")
        .notEmpty()
        .withMessage('nombre esta vacio'),
    check("figura", "figura invalido")
        .notEmpty()
        .withMessage('figura esta vacio'),
    validateInput,
    adminAccess
], createControlPointGroupController);

// PUT /api/v1/control-point-groups/:id
router.put('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("nombre", "nombre invalido")
        .notEmpty()
        .withMessage('nombre esta vacio'),
    check("figura", "figura invalido")
        .notEmpty()
        .withMessage('figura esta vacio'),
    validateInput,
    adminAccess
], updateControlPointGroupController);

// DELETE /api/v1/control-point-groups/:id
router.delete('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    adminAccess
], deleteControlPointGroupController);

module.exports = router;
