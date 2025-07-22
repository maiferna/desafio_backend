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
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], getRouteByIdController);

// POST /api/v1/routes
router.post('/', [
    // validateJwt,
    // validateRole("admin"),
    // check("tecnico", "tecnico inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La tecnico debe ser un numero entero como minimo 1'),
    // check("rutas.fecha", "Fecha inválida").isDate()
    //     .withMessage('El formato de fecha no es correcto'),
    // validateInput
], createRouteController);

// PUT /api/v1/routes/:id
router.put('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // check("tecnico", "tecnico inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La tecnico debe ser un numero entero como minimo 1'),
    // check("rutas.fecha", "Fecha inválida").isDate()
    //     .withMessage('El formato de fecha no es correcto'),
    // validateInput
], updateRouteController);

// DELETE /api/v1/routes/:id
router.delete('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], deleteRouteController);

module.exports = router;
