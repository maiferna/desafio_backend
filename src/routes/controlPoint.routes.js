const express = require('express');
const router = express.Router();
const {
    getAllControlPointsController,
    getControlPointByIdController,
    getControlPointsByInstallationIdController,
    createControlPointController,
    updateControlPointController,
    deleteControlPointController
} = require('../controllers/controlPointController');

const { check } = require("express-validator");
const { validateJwt, validateRole, validateInput } = require("../middlewares/index.js");


// GET all control points
router.get('/', [
    validateJwt,
    validateRole("admin"),
], getAllControlPointsController);

// GET control point by ID
router.get('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], getControlPointByIdController);

// GET control points by installation ID
router.get('/installation/:installationId', [
    validateJwt,
    validateRole("admin"),
    check("installationId", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], getControlPointsByInstallationIdController);

// CREATE new control point
router.post('/', [
    validateJwt,
    validateRole("admin"),
    check("id_producto", "ID de producto invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_instalacion", "ID de instalacion invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_grupo_punto_control", "ID de grupo de punto de control invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("localizacion", "localizacion invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Localizacion esta vacio'),
    check("coordenadas", "coordenadas invalidas")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Coordenadas esta vacio'),
    validateInput,
], createControlPointController);

// UPDATE control point
router.put('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_producto", "ID de producto invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_instalacion", "ID de instalacion invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_grupo_punto_control", "ID grupo de puntos de control invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("localizacion", "localizacion invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Localizacion esta vacio'),
    check("coordenadas", "coordenadas invalidas")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Coordenadas esta vacio'),
    validateInput,
], updateControlPointController);

// DELETE control point
router.delete('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], deleteControlPointController);

module.exports = router;
