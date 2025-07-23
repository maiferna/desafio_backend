const express = require('express');
const router = express.Router();
const {
    getAllVisitsController,
    getVisitByIdController,
    getVisitsByInstallationIdController,
    getVisitsByRouteIdController,
    createVisitController,
    updateVisitStatusController,
    deleteVisitController,
    setVisitRouteController,
} = require('../controllers/visitController');

const { validateRole, validateJwt, validateInput } = require('../middlewares');
const { check } = require('express-validator');


// GET /api/v1/visits
router.get('/', [
    validateJwt,
    validateRole("admin")
], getAllVisitsController);

// GET /api/v1/visits/:id 
router.get("/:id", [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], getVisitByIdController);

// GET /api/v1/visits/installation/:installationId
router.get('/installation/:id_instalacion', [
    validateJwt,
    validateRole("admin"),
    check("id_instalacion", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], getVisitsByInstallationIdController);

// GET /api/v1/visits/route/:routeId 
router.get('/route/:id_ruta', [
    validateJwt,
    validateRole("admin"),
    check("id_ruta", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], getVisitsByRouteIdController);

// POST /api/v1/visits
router.post('/', [
    validateJwt,
    validateRole("admin"),
    check("id_instalacion", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id_instalacion debe ser un numero entero entre 1 y 50'),
    check("id_ruta", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id_ruta debe ser un numero entero entre 1 y 50'),
    check("estado", "Estado inválido").notEmpty()
        .isString()
        .isLength({ min: 1, max: 50 })
        .withMessage('La direccion debe tener entre 1 y 50 caracteres.'),
    validateInput
], createVisitController);

// PUT /api/v1/visits/:id_ruta 
router.put('/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    check("estado", "Estado inválido").notEmpty()
        .isString()
        .isLength({ min: 1, max: 50 })
        .withMessage('La direccion debe tener entre 1 y 50 caracteres.'),
    validateInput
], updateVisitStatusController);

// PUT /api/v1/visits/:id_visita
router.put('/editroute/:id', [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    check("id_ruta", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id_ruta debe ser un numero entero entre 1 y 50'),
    validateInput
], setVisitRouteController);

// DELETE /api/v1/visits/:id_visita
router.delete('/:id_visita', [
    validateJwt,
    validateRole("admin"),
    check("id_visita", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], deleteVisitController);

module.exports = router;
