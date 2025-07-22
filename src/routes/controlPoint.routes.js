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

// Middleware común solo para admins
const adminAccess = [validateJwt, validateRole("admin")];


// GET all control points
router.get('/', [
    adminAccess
], getAllControlPointsController);

// GET control point by ID
router.get('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    adminAccess
], getControlPointByIdController);

// GET control points by installation ID
router.get('/installation/:installationId', [
    check("installationId", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    adminAccess
], getControlPointsByInstallationIdController);

// CREATE new control point
router.post('/', [
    check("id_producto", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_instalacion", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_grupo_punto_control", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("localizacion", "localizacion invalido")
        .notEmpty()
        .withMessage('Localizacion esta vacio'),
    check("coordenadas", "coordenadas invalidas")
        .notEmpty()
        .withMessage('Coordenadas esta vacio'),
    validateInput,
    adminAccess
], createControlPointController);

// UPDATE control point
router.put('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_producto", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_instalacion", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("id_grupo_punto_control", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("localizacion", "localizacion invalido")
        .notEmpty()
        .withMessage('Localizacion esta vacio'),
    check("coordenadas", "coordenadas invalidas")
        .notEmpty()
        .withMessage('Coordenadas esta vacio'),
    validateInput,
    adminAccess
], updateControlPointController);

// DELETE control point
router.delete('/:id', [
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    adminAccess
], deleteControlPointController);

module.exports = router;
