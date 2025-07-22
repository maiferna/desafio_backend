const express = require('express');
const router = express.Router();
const {
    getAllControlPointStatesController,
    getControlPointStateByIdController,
    createControlPointStateController,
    updateControlPointStateController,
    deleteControlPointStateController
} = require('../controllers/controlPointStateController');

const { check } = require("express-validator");
const { validateJwt, validateRole, validateInput } = require("../middlewares/index.js");


// GET /api/v1/control-point-states
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllControlPointStatesController);

// GET /api/v1/control-point-states/:id
router.get('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], getControlPointStateByIdController);

// POST /api/v1/control-point-states
router.post('/', [
    validateJwt,
    validateRole("admin"),
    check("nombre", "nombre invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('nombre esta vacio'),
    check("color", "color invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('color esta vacio'),
    validateInput,
], createControlPointStateController);

// PUT /api/v1/control-point-states/:id
router.put('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("nombre", "nombre invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('nombre esta vacio'),
    check("color", "color invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('color esta vacio'),
    validateInput,
], updateControlPointStateController);

// DELETE /api/v1/control-point-states/:id
router.delete('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], deleteControlPointStateController);

module.exports = router;
