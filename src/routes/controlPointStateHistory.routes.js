const express = require('express');
const router = express.Router();
const {
    getAllControlPointStateHistoryController,
    getControlPointStateHistoryByIdController,
    getControlPointStateHistoryByControlPointIdController,
    createControlPointStateHistoryController,
    updateControlPointStateHistoryController,
    deleteControlPointStateHistoryController
} = require('../controllers/controlPointStateHistoryController');

const { check } = require("express-validator");
const { validateJwt, validateRole, validateInput } = require("../middlewares/index.js");

// Middleware común solo para admins
const adminAccess = [validateJwt, validateRole("admin")];

// GET /api/v1/control-point-state-history
router.get('/', [
    adminAccess
], getAllControlPointStateHistoryController);

// GET /api/v1/control-point-state-history/:id
router.get('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], getControlPointStateHistoryByIdController);

// GET /api/v1/control-point-state-history/control-point/:controlPointId
router.get('/control-point/:controlPointId', [
    check("controlPointId", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], getControlPointStateHistoryByControlPointIdController);

// POST /api/v1/control-point-state-history
router.post('/', [
    check("id_estado_punto_control", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_punto_control", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_ejecucion_servicio", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("observaciones", "observaciones invalido")
        .notEmpty()
        .withMessage('observaciones esta vacio'),
    validateInput,
    ...adminAccess
], createControlPointStateHistoryController);

// PUT /api/v1/control-point-state-history/:id
router.put('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_estado_punto_control", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_punto_control", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_ejecucion_servicio", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("observaciones", "observaciones invalido")
        .notEmpty()
        .withMessage('observaciones esta vacio'),
    validateInput,
    ...adminAccess
], updateControlPointStateHistoryController);

// DELETE /api/v1/control-point-state-history/:id
router.delete('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], deleteControlPointStateHistoryController);

module.exports = router;
