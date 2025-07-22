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


/**
 * GET /api/v1/products → obtener todos los productos
 */
router.get("/", [
    validateJwt,
    validateRole("admin"),
], getAllProductsController);

/**
 * GET /api/v1/products/:id_producto → obtener producto por id
 */
router.get("/:id", [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1, max: 50 })
    //     .withMessage('La id debe ser un numero entero entre 1 y 50'),
    // validateInput,
], getProductByIdController);


/**
 * GET /api/v1/product/producto/:tipo → obtener productos por tipo
 */
router.get("/producto/:tipo", [
    // validateJwt,
    // validateRole("admin"),
    // check("tipo", "Tipo invalido").notEmpty()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El tipo debe tener entre 1 y 150 caracteres.'),
    // validateInput,
], getProductsByTypeController);

/**
 * POST /api/v1/products → crear producto
 */
router.post("/", [
    // validateJwt,
    // validateRole("admin"),
    // check("nombre", "nombre inválido")
    //     .notEmpty()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El nombre debe tener entre 1 y 150 caracteres.'),
    // check("descripcion", "descripción invalida")
    //     .notEmpty()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('La descripcion debe tener entre 1 y 150 caracteres.'),
    // check("tipo", "tipo invalido")
    //     .notEmpty()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El tipo debe tener entre 1 y 150 caracteres.'),
    // check('unidad', 'unidad invalida')
    //     .notEmpty()
    //     .isInt({ min: 1, max: 50 })
    //     .withMessage('La unidad debe ser un numero entero entre 1 y 50'),
    // validateInput,
], createProductController);

/**
 * PUT /api/v1/products/:id_producto → actualizar producto por ID
 */
router.put("/:id", [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1, max: 50 })
    //     .withMessage('La id debe ser un numero entero entre 1 y 50'),
    // check("nombre", "nombre inválido")
    //     .notEmpty()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El nombre debe tener entre 1 y 150 caracteres.'),
    // check("descripcion", "descripción invalida")
    //     .notEmpty()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('La descripcion debe tener entre 1 y 150 caracteres.'),
    // check("tipo", "tipo invalido")
    //     .notEmpty()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El tipo debe tener entre 1 y 150 caracteres.'),
    // check('unidad', 'unidad invalida')
    //     .notEmpty()
    //     .isInt({ min: 1, max: 50 })
    //     .withMessage('La unidad debe ser un numero entero entre 1 y 50'),
    // validateInput,
], updateProductByIdController);


/**
 * DELETE /api/v1/products/:id_producto → eliminar producto por ID
 */
router.delete("/:id", [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput,
], deleteProductByIdController);

module.exports = router;