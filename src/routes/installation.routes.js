const express = require('express');
const router = express.Router();
const {
    getAllInstallationsController,
    getInstallationByIdController,
    getInstallationsByClientController,
    createInstallationController,
    updateInstallationController,
    deleteInstallationController,
} = require('../controllers/installationController.js');

const { validateInput, validateJwt, validateRole } = require('../middlewares/index.js');
const { check } = require('express-validator');

// GET /api/v1/installations
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllInstallationsController);

// GET /api/v1/installations/:id
router.get('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    //validateInput
], getInstallationByIdController);

// GET /api/v1/installations/client/:clientId
router.get('/client/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // check("cliente.nombre", "Nombre inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El nombre debe tener entre 1 y 150 caracteres.'),
    // check("direccion", "Direccion inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('La direccion debe tener entre 1 y 150 caracteres.'),
    //validateInput
], getInstallationsByClientController);

// POST /api/v1/installations   //direccion, cliente.nombre
router.post('/', [
    // validateJwt,
    // validateRole("admin"),
    // check("cliente.nombre", "Nombre inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El nombre debe tener entre 1 y 150 caracteres.'),
    // check("direccion", "Direccion inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('La direccion debe tener entre 1 y 150 caracteres.'),
    //validateInput
], createInstallationController);

// PUT /api/v1/installations/:id
router.put('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // check("cliente.nombre", "Nombre inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El nombre debe tener entre 1 y 150 caracteres.'),
    // check("direccion", "Direccion inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('La direccion debe tener entre 1 y 150 caracteres.'),
    //validateInput
], updateInstallationController);

// DELETE /api/v1/installations/:id
router.delete('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    //validateInput
], deleteInstallationController);

module.exports = router;
