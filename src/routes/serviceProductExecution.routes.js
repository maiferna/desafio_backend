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



// GET /api/v1/service-product-executions
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllServiceProductExecutionsController);

// GET /api/v1/service-product-executions/:id
router.get('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //  .isInt({ min: 1, max: 50 })
    //     .withMessage('La id debe ser un numero entero entre 1 y 50'),
    // validateInput
], getServiceProductExecutionByIdController);

// GET /api/v1/service-product-executions/service-execution/:serviceExecutionId
router.get('/service-execution/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //  .isInt({ min: 1, max: 50 })
    //     .withMessage('La id debe ser un numero entero entre 1 y 50'),
    // validateInput
], getServiceProductExecutionsByServiceExecutionIdController);

// POST /api/v1/service-product-executions
router.post('/', [
    // validateJwt,
    // validateRole("admin"),
    // check("productos.nombre", "Producto inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El producto debe tener entre 1 y 150 caracteres.'),
    // check("ejecu_servi.observaciones", "Observaciones inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 500 })
    //     .withMessage('La observacion debe tener entre 1 y 500 caracteres.'),
    // check("ejecu_servi.datos", "Datos inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 200 })
    //     .withMessage('Los datos debe tener entre 1 y 200 caracteres.'),
    // check("cantindad", "Cantidad inválido").notEmpty()
    //     .isInt({ min: 1 , max: 50})
    //     .withMessage('La cantidad debe ser un numero entero entre 1 y 50'),
    // validateInput
], createServiceProductExecutionController);

// PUT /api/v1/service-product-executions/:id
router.put('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //  .isInt({ min: 1, max: 50 })
    //     .withMessage('La id debe ser un numero entero entre 1 y 50'),
    // check("productos.nombre", "Producto inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El producto debe tener entre 1 y 150 caracteres.'),
    // check("ejecu_servi.observaciones", "Observaciones inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 500 })
    //     .withMessage('La observacion debe tener entre 1 y 500 caracteres.'),
    // check("ejecu_servi.datos", "Datos inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 200 })
    //     .withMessage('Los datos debe tener entre 1 y 200 caracteres.'),
    // check("cantindad", "Cantidad inválido").notEmpty()
    //     .isInt({ min: 1 , max: 50})
    //     .withMessage('La cantidad debe ser un numero entero entre 1 y 50'),
    // validateInput
], updateServiceProductExecutionController);

// DELETE /api/v1/service-product-executions/:id
router.delete('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //  .isInt({ min: 1, max: 50 })
    //     .withMessage('La id debe ser un numero entero entre 1 y 50'),
    // validateInput
], deleteServiceProductExecutionController);

module.exports = router;
