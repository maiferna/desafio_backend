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
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], getInstallationByIdController);

// GET /api/v1/installations/client/:id_cliente
router.get('/client/:id_cliente', [
    validateJwt,
    validateRole("admin"),
    check("id_cliente", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], getInstallationsByClientController);

// POST /api/v1/installations  
router.post('/', [
    validateJwt,
    validateRole("admin"),
    check("id_cliente", "Id inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('El id debe ser un nº tener entre 1 y 50 caracteres.'),
    check("direccion", "Direccion inválido").notEmpty()
        .isString()
        .isLength({ min: 1, max: 150 })
        .withMessage('La direccion debe tener entre 1 y 150 caracteres.'),
    validateInput
], createInstallationController);

// PUT /api/v1/installations/:id
router.put('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    check("id_cliente", "Id inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('El id debe ser un nº tener entre 1 y 50 caracteres.'),
    check("direccion", "Direccion inválido").notEmpty()
        .isString()
        .isLength({ min: 1, max: 150 })
        .withMessage('La direccion debe tener entre 1 y 150 caracteres.'),
    validateInput
], updateInstallationController);

// DELETE /api/v1/installations/:id
router.delete('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], deleteInstallationController);


module.exports = router;
