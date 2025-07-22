const express = require('express');
const router = express.Router();
const {
    getAllServicesController,
    getServiceByIdController,
    createServiceController,
    updateServiceController,
    deleteServiceController,
} = require('../controllers/serviceController');
const { validateJwt, validateRole } = require('../middlewares');
const { check } = require('express-validator');

// GET /api/v1/services
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllServicesController);

// GET /api/v1/services/:id
router.get('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], getServiceByIdController);

// POST /api/v1/services // nombre , descripcion, datos
router.post('/', [
    // validateJwt,
    // validateRole("admin"),
    // check("nombre", "Nombre inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El producto debe tener entre 1 y 150 caracteres.'),
    // check("descripcion", "Descripcion inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('La observacion debe tener entre 1 y 150 caracteres.'),
    // check("datos", "Datos inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('Los datos debe tener entre 1 y 150 caracteres.'),
    // validateInput
], createServiceController);

// PUT /api/v1/services/:id
router.put('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // check("nombre", "Nombre inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El producto debe tener entre 1 y 150 caracteres.'),
    // check("descripcion", "Descripcion inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('La observacion debe tener entre 1 y 150 caracteres.'),
    // check("datos", "Datos inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('Los datos debe tener entre 1 y 150 caracteres.'),
    // validateInput
], updateServiceController);

// DELETE /api/v1/services/:id
router.delete('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], deleteServiceController);

module.exports = router;
