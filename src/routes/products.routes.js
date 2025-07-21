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

const { validateJwt, validateRole } = require("../middlewares/index.js");

/**
 * Middleware: solo accesible para admins
 */
const adminAccess = [/* validateJwt, validateRole("admin") */];

/**
 * GET /api/v1/products → obtener todos los productos
 */
router.get("/", adminAccess, getAllProductsController);

/**
 * GET /api/v1/products/:id_producto → obtener producto por id
 */
router.get("/:id_producto", adminAccess, getProductByIdController);


/**
 * GET /api/v1/product/producto/:tipo → obtener productos por tipo
 */
router.get("/producto/:tipo", adminAccess, getProductsByTypeController);

/**
 * POST /api/v1/products → crear producto
 */
router.post("/", adminAccess, createProductController);

/**
 * PUT /api/v1/products/:id_producto → actualizar producto por ID
 */
router.put("/:id_producto", adminAccess, updateProductByIdController);


/**
 * DELETE /api/v1/products/:id_producto → eliminar producto por ID
 */
router.delete("/:id_producto", adminAccess, deleteProductByIdController);

module.exports = router;