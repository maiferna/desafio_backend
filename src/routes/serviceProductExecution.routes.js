const express = require('express');
const router = express.Router();
const {
    getAllServiceProductExecutionsController,
    getServiceProductExecutionByIdController,
    getServiceProductExecutionsByServiceExecutionIdController,
    createServiceProductExecutionController,
    updateServiceProductExecutionController,
    deleteServiceProductExecutionController
} = require('../controllers/serviceProductExecutionController');

const { validateJwt, validateRole, validateInput } = require('../middlewares');
const { check } = require('express-validator');



// GET /api/v1/service-product-executions
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllServiceProductExecutionsController);

// GET /api/v1/service-product-executions/:id
router.get('/:id_ejecucion_producto', [
    validateJwt,
    validateRole("admin"),
    check("id_ejecucion_producto", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], getServiceProductExecutionByIdController);

// GET /api/v1/service-product-executions/service-execution/:serviceExecutionId
router.get('/service-execution/:id_ejecucion_servicio', [
    validateJwt,
    validateRole("admin"),
    check("id_ejecucion_servicio", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], getServiceProductExecutionsByServiceExecutionIdController);

// POST /api/v1/service-product-executions
router.post('/', [
    validateJwt,
    validateRole("admin"),
    check("id_ejecucion_servicio", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id_ejecucion_servicio debe ser un numero entero entre 1 y 50'),
    check("id_producto", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id_producto debe ser un numero entero entre 1 y 50'),
    check("cantidad", "Cantidad inválido").notEmpty()
        .isInt({ min: 1, max: 500 })
        .withMessage('La cantidad debe ser un numero entero entre 1 y 500'),
    validateInput
], createServiceProductExecutionController);

// PUT /api/v1/service-product-executions/:id
router.put('/:id_ejecucion_producto', [
    validateJwt,
    validateRole("admin"),
    check("id_ejecucion_producto", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    check("id_ejecucion_servicio", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id_ejecucion_servicio debe ser un numero entero entre 1 y 50'),
    check("id_producto", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id_producto debe ser un numero entero entre 1 y 50'),
    check("cantidad", "Cantidad inválido").notEmpty()
        .isInt({ min: 1, max: 500 })
        .withMessage('La cantidad debe ser un numero entero entre 1 y 500'),
    validateInput
], updateServiceProductExecutionController);

// DELETE /api/v1/service-product-executions/:id
router.delete('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], deleteServiceProductExecutionController);

module.exports = router;
