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


// GET /api/v1/captures
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllCapturesController);

// GET /api/v1/captures/:id
router.get('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], getCaptureByIdController);

// POST /api/v1/captures
router.post('/', [
    validateJwt,
    validateRole("admin"),
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
        .isInt({ min: 1, max: 150 })
        .withMessage('La id debe ser un numero entero como minimo 1 y maximo 150'),
    check("observaciones", "tipo invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('El campo debe tener por lo menos 1 caracter y maximo 10000'),
    validateInput,
], createCaptureController);


// PUT /api/v1/captures/:id
router.put('/:id', [
    validateJwt,
    validateRole("admin"),
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
        .isInt({ min: 1, max: 150 })
        .withMessage('La id debe ser un numero entero como minimo 1 y maximo 150'),
    check("observaciones", "tipo invalido")
        .notEmpty()
        .isLength({ min: 1, max: 10000 })
        .withMessage('El campo debe tener por lo menos 1 caracter y maximo 10000'),
    validateInput,
], updateCaptureController);

// DELETE /api/v1/captures/:id
router.delete('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id_producto", "ID inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], deleteCaptureController);

module.exports = router;
