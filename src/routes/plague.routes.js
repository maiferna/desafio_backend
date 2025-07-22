const express = require('express');
const router = express.Router();
const {
    getAllPlaguesController,
    getPlagueByIdController,
    createPlagueController,
    updatePlagueController,
    deletePlagueController
} = require('../controllers/plagueController');

const { validateJwt, validateRole, validateInput } = require('../middlewares');
const { check } = require('express-validator');

// GET /api/v1/plagues
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllPlaguesController);

// GET /api/v1/plagues/:id
router.get('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], getPlagueByIdController);

// POST /api/v1/plagues
router.post('/', [
    // validateJwt,
    // validateRole("admin"),
    // check("nombre", "Nombre inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El producto debe tener entre 1 y 150 caracteres.'),
    // validateInput
], createPlagueController);

// PUT /api/v1/plagues/:id
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
    // validateInput
], updatePlagueController);

// DELETE /api/v1/plagues/:id
router.delete('/:id', [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], deletePlagueController);

module.exports = router;
