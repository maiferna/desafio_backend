const express = require('express');
const router = express.Router();
const {
    getAllControlPointGroupsController,
    getControlPointGroupByIdController,
    createControlPointGroupController,
    updateControlPointGroupController,
    deleteControlPointGroupController
} = require('../controllers/controlPointGroupController');

const { check } = require("express-validator");
const { validateJwt, validateRole, validateInput } = require("../middlewares/index.js");


// GET /api/v1/control-point-groups
router.get('/', [
    //validateJwt,
    //validateRole("admin"),
], getAllControlPointGroupsController);

// GET /api/v1/control-point-groups/:id
router.get('/:id', [
    //validateJwt,
    //validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
], getControlPointGroupByIdController);

// POST /api/v1/control-point-groups
router.post('/', [
    //validateJwt,
    //validateRole("admin"),
    check("nombre", "nombre invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('nombre esta vacio'),
    check("figura", "figura invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('figura esta vacio'),
    validateInput,
], createControlPointGroupController);

// PUT /api/v1/control-point-groups/:id
router.put('/:id', [
    //validateJwt,
    //validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1, max: 1000 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("nombre", "nombre invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('nombre esta vacio'),
    check("figura", "figura invalido")
        .notEmpty()
        .isLength({ min: 1, max: 1000 })
        .withMessage('figura esta vacio'),
    validateInput,
], updateControlPointGroupController);

// DELETE /api/v1/control-point-groups/:id
router.delete('/:id', [
    //validateJwt,
    //validateRole("admin"),
    check("id", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
], deleteControlPointGroupController);

module.exports = router;
