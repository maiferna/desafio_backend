const express = require('express');
const router = express.Router();
const {
    getAllServicesController,
    getServiceByIdController,
    createServiceController,
    updateServiceController,
    deleteServiceController,
} = require('../controllers/serviceController');
const { validateJwt, validateRole, validateInput } = require('../middlewares');
const { check } = require('express-validator');

// GET /api/v1/services
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllServicesController);

// GET /api/v1/services/:id
router.get('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], getServiceByIdController);

// POST /api/v1/services // nombre , descripcion, datos
router.post('/', [
    validateJwt,
    validateRole("admin"),
    check("nombre", "Nombre inválido").notEmpty()
        .isString()
        .isLength({ min: 1, max: 150 })
        .withMessage('El producto debe tener entre 1 y 150 caracteres.'),
    check("descripcion", "Descripcion inválido").notEmpty()
        .isString()
        .isLength({ min: 1, max: 500 })
        .withMessage('La observacion debe tener entre 1 y 500 caracteres.'),
    check("datos").custom((value) => {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new Error("Datos debe ser un objeto");
        }

        if (value.frecuencia && !["diaria", "semanal", "mensual"].includes(value.frecuencia)) {
            throw new Error("Frecuencia no válida");
        }

        if (value.duracion && !/^(\d+)\s?(horas|min|minutos)$/.test(value.duracion)) {
            throw new Error("Duración no válida");
        }

        return true;
    }),
    validateInput
], createServiceController);

// PUT /api/v1/services/:id
router.put('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    check("nombre", "Nombre inválido").notEmpty()
        .isString()
        .isLength({ min: 1, max: 150 })
        .withMessage('El producto debe tener entre 1 y 150 caracteres.'),
    check("descripcion", "Descripcion inválido").notEmpty()
        .isString()
        .isLength({ min: 1, max: 500 })
        .withMessage('La observacion debe tener entre 1 y 500 caracteres.'),
    check("datos").custom((value) => {
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new Error("Datos debe ser un objeto");
        }

        if (value.frecuencia && !["diaria", "semanal", "mensual"].includes(value.frecuencia)) {
            throw new Error("Frecuencia no válida");
        }

        if (value.duracion && !/^(\d+)\s?(horas|min|minutos)$/.test(value.duracion)) {
            throw new Error("Duración no válida");
        }

        return true;
    }),
    validateInput
], updateServiceController);

// DELETE /api/v1/services/:id
router.delete('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], deleteServiceController);

module.exports = router;
