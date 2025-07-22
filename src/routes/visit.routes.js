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

// Middleware común solo para tecnicos
const tecnicoAccess = [validateJwt, validateRole("tecnico")];
// Middleware común solo para admins
const adminAccess = [validateJwt, validateRole("admin")];

// GET /api/v1/visits
router.get('/', [
    validateJwt,
    validateRole("admin")
], getAllVisitsController);

// GET /api/v1/visits/:id 
router.get("/:id_visita", [
    // validateJwt,
    // validateRole("tecnico"),
    // check("id_visita", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], getVisitByIdController); //ERROR EN VALIDATE: 404 MENSAJE 'Visit not found' 

// GET /api/v1/visits/installation/:installationId
router.get('/installation/:id_instalacion', [
    // validateJwt,
    // validateRole("tecnico"),
    // check("id_instalacion", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], getVisitsByInstallationIdController);

// GET /api/v1/visits/route/:routeId 
router.get('/route/:id_ruta', [
    // validateJwt,
    // validateRole("admin"),
    // check("id_ruta", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // validateInput
], getVisitsByRouteIdController); //ERROR EN VALIDATE: ARRAY VACIO 

// POST /api/v1/visits
router.post('/', [
    // validateJwt,
    // validateRole("admin"),
    // check("instalaciones.direccion", "Direccion inválido").notEmpty()
    //     .isString()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('La direccion debe tener entre 1 y 150 caracteres.'),
    // check("clientes.nombre", "Nombre inválido").notEmpty()
    //     .isString
    //     .isLength({ min: 1, max: 50 })
    //     .withMessage('La direccion debe tener entre 1 y 50 caracteres.'),
    // check("tecnico", "tecnico inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La tecnico debe ser un numero entero como minimo 1'),
    // check("rutas.fecha", "Fecha inválida").isDate()
    //     .withMessage('El formato de fecha no es correcto'),
    // validateInput
], createVisitController);

// PUT /api/v1/visits/:id_ruta
router.put('/:id_ruta', [
    // validateJwt,
    // validateRole("admin"),
    // check("id_ruta", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // check("tecnico", "tecnico inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La tecnico debe ser un numero entero como minimo 1'),
    // check("rutas.fecha", "Fecha inválida").isDate()
    //     .withMessage('El formato de fecha no es correcto'),
    // validateInput
], updateVisitStatusController);

// PUT /api/v1/visits/:id_ruta
router.put('/:id_ruta', [
    // validateJwt,
    // validateRole("admin"),
    // check("id_ruta", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // check("tecnico", "tecnico inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La tecnico debe ser un numero entero como minimo 1'),
    // check("rutas.fecha", "Fecha inválida").isDate()
    //     .withMessage('El formato de fecha no es correcto'),
    // validateInput
], setVisitRouteController);

// DELETE /api/v1/visits/:id_visita
router.delete('/:id_visita', [
    validateJwt,
    validateRole("admin"),
    check("id_visita", "ID inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput
], deleteVisitController);

module.exports = router;
