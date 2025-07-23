const express = require('express');
const router = express.Router();

const {
    getAllServiceExecutionsController,
    getServiceExecutionByIdController,
    getServiceExecutionsByVisitIdController,
    createServiceExecutionController,
    updateServiceExecutionController,
    deleteServiceExecutionController,
} = require('../controllers/serviceExecutionController');
const { validateJwt, validateRole, validateInput } = require('../middlewares');
const { check } = require('express-validator');

// GET /api/v1/service-executions
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllServiceExecutionsController);

// GET /api/v1/service-executions/:id
router.get('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], getServiceExecutionByIdController);

// GET /api/v1/service-executions/visit/:visitId
router.get('/visit/:id_visita', [
    validateJwt,
    validateRole("admin"),
    check("id_visita", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], getServiceExecutionsByVisitIdController);

// POST /api/v1/service-executions
router.post('/', [
    validateJwt,
    validateRole("admin"),
    check("id_visita", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id_visita debe ser un numero entero entre 1 y 50'),
    check("id_servicio", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id_servicio debe ser un numero entero entre 1 y 50'),
    check("observaciones", "Observaciones inválido").notEmpty()
        .isString()
        .isLength({ min: 1, max: 500 })
        .withMessage('La observacion debe tener entre 1 y 500 caracteres.'),
    check("datos").custom((value) => {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new Error("Datos debe ser un objeto");
        }
        return true;
    }),
    validateInput
], createServiceExecutionController);

// PUT /api/v1/service-executions/:id
router.put('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    check("id_visita", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id_visita debe ser un numero entero entre 1 y 50'),
    check("id_servicio", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id_servicio debe ser un numero entero entre 1 y 50'),
    check("observaciones", "Observaciones inválido").notEmpty()
        .isString()
        .isLength({ min: 1, max: 500 })
        .withMessage('La observacion debe tener entre 1 y 500 caracteres.'),
    check("datos").custom((value) => {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new Error("Datos debe ser un objeto");
        }
        return true;
    }),
    validateInput
], updateServiceExecutionController);

// DELETE /api/v1/service-executions/:id
router.delete('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], deleteServiceExecutionController);

module.exports = router;
