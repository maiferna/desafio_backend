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


// GET /api/v1/control-point-state-history
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllControlPointStateHistoryController);

// GET /api/v1/control-point-state-history/:id
router.get('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], getControlPointStateHistoryByIdController);

// GET /api/v1/control-point-state-history/control-point/:controlPointId
router.get('/control-point/:controlPointId', [
    validateJwt,
    validateRole("admin"),
    check("controlPointId", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], getControlPointStateHistoryByControlPointIdController);

// POST /api/v1/control-point-state-history
router.post('/', [
    validateJwt,
    validateRole("admin"),
    check("id_estado_punto_control", "ID de estado de punto de control invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_punto_control", "ID punto de control invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_ejecucion_servicio", "ID de ejecucion de servicio invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("observaciones", "observaciones invalido")
        .notEmpty()
        .isLength({ min: 1, max: 10000 })
        .withMessage('observaciones esta vacio'),
    validateInput,
], createControlPointStateHistoryController);

// PUT /api/v1/control-point-state-history/:id
router.put('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_estado_punto_control", "ID de estado de punto de control invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_punto_control", "ID de punto de control invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_ejecucion_servicio", "ID de ejecucion del servicio invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("observaciones", "observaciones invalido")
        .notEmpty()
        .isLength({ min: 1, max: 10000 })
        .withMessage('observaciones esta vacio'),
    validateInput,
], updateControlPointStateHistoryController);

// DELETE /api/v1/control-point-state-history/:id
router.delete('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], deleteControlPointStateHistoryController);

module.exports = router;
