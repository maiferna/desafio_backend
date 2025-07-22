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
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], getServiceExecutionByIdController);

// GET /api/v1/service-executions/visit/:visitId
router.get('/visit/:visitId', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], getServiceExecutionsByVisitIdController);

// POST /api/v1/service-executions
router.post('/', [
    // validateJwt,
    // validateRole("admin"),
    // check("productos.nombre", "Producto inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El producto debe tener entre 1 y 150 caracteres.'),
    // check("ejecu_servi.observaciones", "Observaciones inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('La observacion debe tener entre 1 y 150 caracteres.'),
    // check("ejecu_servi.datos", "Datos inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('Los datos debe tener entre 1 y 150 caracteres.'),
    // check("cantindad", "Cantidad inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La cantidad debe ser un numero entero como minimo 1'),
    // validateInput
], createServiceExecutionController);

// PUT /api/v1/service-executions/:id
router.put('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("productos.nombre", "Producto inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El producto debe tener entre 1 y 150 caracteres.'),
    // check("ejecu_servi.observaciones", "Observaciones inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('La observacion debe tener entre 1 y 150 caracteres.'),
    // check("ejecu_servi.datos", "Datos inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('Los datos debe tener entre 1 y 150 caracteres.'),
    // check("cantindad", "Cantidad inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La cantidad debe ser un numero entero como minimo 1'),
    // validateInput
], updateServiceExecutionController);

// DELETE /api/v1/service-executions/:id
router.delete('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], deleteServiceExecutionController);

module.exports = router;
