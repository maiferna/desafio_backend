const express = require('express');
const router = express.Router();

const {
    getAllRoutesController,
    getRouteByIdController,
    createRouteController,
    updateRouteController,
    deleteRouteController,
} = require('../controllers/routeController');

const { validateJwt, validateRole, validateInput } = require('../middlewares');
const { check } = require('express-validator');

// GET /api/v1/routes
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllRoutesController);

// GET /api/v1/routes/:id
router.get('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput,
], getRouteByIdController);

// POST /api/v1/routes
router.post('/', [
    validateJwt,
    validateRole("admin"),
    check("tecnico", "tecnico inválido").notEmpty()
        .isInt({ min: 1, max: 150 })
        .withMessage('El tecnico debe ser un numero entero tener entre 1 y 150 caracteres.'),
    check("fecha", "Fecha inválida").isDate()
        .withMessage('El formato de fecha no es correcto'),
    validateInput
], createRouteController);

// PUT /api/v1/routes/:id
router.put('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    check("tecnico", "tecnico inválido").notEmpty()
        .isInt({ min: 1, max: 150 })
        .withMessage('El tecnico debe ser un numero entero tener entre 1 y 150 caracteres.'),
    check("fecha", "Fecha inválida").isDate()
        .withMessage('El formato de fecha no es correcto'),
    validateInput
], updateRouteController);

// DELETE /api/v1/routes/:id
router.delete('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], deleteRouteController);

module.exports = router;
