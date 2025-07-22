const express = require("express");
const router = express.Router();

const {
    createProductController,
    deleteProductByIdController,
    getAllProductsController,
    getProductByIdController,
    getProductsByTypeController,
    updateProductByIdController
} = require("../controllers/products.controllers.js");

const { check } = require("express-validator");
const { validateJwt, validateRole, validateInput } = require("../middlewares/index.js");

/**
 * Middleware: solo accesible para admins
 */
const adminAccess = [validateJwt, validateRole("admin")];

/**
 * GET /api/v1/products → obtener todos los productos
 */
router.get("/", [
    adminAccess
], getAllProductsController);

/**
 * GET /api/v1/products/:id_producto → obtener producto por id
 */
router.get("/:id_producto", [
    check("id_producto", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], getProductByIdController);


/**
 * GET /api/v1/product/producto/:tipo → obtener productos por tipo
 */
router.get("/producto/:tipo", [
    check("tipo", "Tipo invalido").notEmpty()
        .withMessage('El tipo no puede estar vacio'),
    validateInput,
    ...adminAccess
], getProductsByTypeController);

/**
 * POST /api/v1/products → crear producto
 */
router.post("/", [
    check("nombre", "nombre inválido")
        .notEmpty()
        .withMessage('El nombre esta vacio'),
    check("descripcion", "descripción invalida")
        .notEmpty()
        .withMessage('La descripción esta vacia'),
    check("tipo", "tipo invalido")
        .notEmpty()
        .withMessage('Tipo esta vacio'),
    check('unidad', 'unidad invalida')
        .notEmpty()
        .withMessage('Unidad esta vacia'),
    validateInput,
    ...adminAccess
], createProductController);

/**
 * PUT /api/v1/products/:id_producto → actualizar producto por ID
 */
router.put("/:id_producto", [
    check("id_usuario", "ID inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    check("nombre", "nombre inválido")
        .notEmpty()
        .withMessage('El nombre esta vacio'),
    check("descripcion", "descripción invalida")
        .notEmpty()
        .withMessage('La descripción esta vacia'),
    check("tipo", "tipo invalido")
        .notEmpty()
        .withMessage('Tipo esta vacio'),
    check('unidad', 'unidad invalida')
        .notEmpty()
        .withMessage('Unidad esta vacia'),
    validateInput,
    ...adminAccess
], updateProductByIdController);


/**
 * DELETE /api/v1/products/:id_producto → eliminar producto por ID
 */
router.delete("/:id_producto", [
    check("id_producto", "ID inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
], deleteProductByIdController);

module.exports = router;