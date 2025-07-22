const express = require('express');
const router = express.Router();
const {
    getAllCapturesController,
    getCaptureByIdController,
    createCaptureController,
    updateCaptureController,
    deleteCaptureController
} = require('../controllers/captureController');

const { check } = require("express-validator");
const { validateJwt, validateRole, validateInput } = require("../middlewares/index.js");

// Middleware común solo para admins
const adminAccess = [validateJwt, validateRole("admin")];

// GET /api/v1/captures
router.get('/', [
    adminAccess
], getAllCapturesController);

// GET /api/v1/captures/:id
router.get('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], getCaptureByIdController);

// POST /api/v1/captures
router.post('/', [
    check("id_plaga", "ID de plaga inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_punto_control", "ID de punto de control inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_ejecucion_servicio", "ID de ejecucion de servicio inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("cantidad", "cantidad inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("observaciones", "tipo invalido")
        .notEmpty()
        .withMessage('Observaciones esta vacio'),
    validateInput,
    ...adminAccess
], createCaptureController);


// PUT /api/v1/captures/:id
router.put('/:id', [
    check("id_captura", "ID de captura inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_plaga", "ID de plaga inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_punto_control", "ID de punto de control inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_ejecucion_servicio", "ID de ejecucion de servicio inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("cantidad", "cantidad inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("observaciones", "tipo invalido")
        .notEmpty()
        .withMessage('Observaciones esta vacio'),
    validateInput,
    ...adminAccess
], updateCaptureController);

// DELETE /api/v1/captures/:id
router.delete('/:id', [
    check("id_producto", "ID inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], deleteCaptureController);

module.exports = router;
