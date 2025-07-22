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
<<<<<<< HEAD

=======
const adminAccess = [validateJwt];
>>>>>>> 4fa45ae710d20907abe489ce9b78f79059d95aa0

/**
 * GET /api/v1/products → obtener todos los productos
 */
router.get("/", [
<<<<<<< HEAD
    validateJwt,
    validateRole("admin"),
=======
    validateRole("admin"),
    adminAccess
>>>>>>> 4fa45ae710d20907abe489ce9b78f79059d95aa0
], getAllProductsController);

/**
 * GET /api/v1/products/:id_producto → obtener producto por id
 */
<<<<<<< HEAD
router.get("/:id", [
    // validateJwt,
    // validateRole("admin"),
    // check("id", "ID inválido").notEmpty()
    //     .isInt({ min: 1, max: 50 })
    //     .withMessage('La id debe ser un numero entero entre 1 y 50'),
    // validateInput,
=======
router.get("/:id_producto", [
    validateRole("admin"),
    check("id_producto", "ID invalido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput,
    ...adminAccess
>>>>>>> 4fa45ae710d20907abe489ce9b78f79059d95aa0
], getProductByIdController);


/**
 * GET /api/v1/product/producto/:tipo → obtener productos por tipo
 */
router.get("/producto/:tipo", [
<<<<<<< HEAD
    // validateJwt,
    // validateRole("admin"),
    // check("tipo", "Tipo invalido").notEmpty()
    //     .isLength({ min: 1, max: 150 })
    //     .withMessage('El tipo debe tener entre 1 y 150 caracteres.'),
    // validateInput,
=======
    validateRole("admin"),
    check("tipo", "Tipo invalido").notEmpty()
        .withMessage('El tipo no puede estar vacio'),
    validateInput,
    ...adminAccess
>>>>>>> 4fa45ae710d20907abe489ce9b78f79059d95aa0
], getProductsByTypeController);

/**
 * POST /api/v1/products → crear producto
 */
router.post("/", [
<<<<<<< HEAD
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
=======
    validateRole("admin"),
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
>>>>>>> 4fa45ae710d20907abe489ce9b78f79059d95aa0
], createProductController);

/**
 * PUT /api/v1/products/:id_producto → actualizar producto por ID
 */
<<<<<<< HEAD
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
=======
router.put("/:id_producto", [
    validateRole("admin"),
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
>>>>>>> 4fa45ae710d20907abe489ce9b78f79059d95aa0
], updateProductByIdController);


/**
 * DELETE /api/v1/products/:id_producto → eliminar producto por ID
 */
<<<<<<< HEAD
router.delete("/:id", [
    validateJwt,
    validateRole("admin"),
    check("id", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
=======
router.delete("/:id_producto", [
    validateRole("admin"),
    check("id_producto", "ID inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
>>>>>>> 4fa45ae710d20907abe489ce9b78f79059d95aa0
    validateInput,
], deleteProductByIdController);

module.exports = router;