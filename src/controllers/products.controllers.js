const {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    getProductsByType,
    updateProductById
} = require("../models/products.models");

/**
 * Recive todos los campos de todos los productos
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getAllProductsController = async (req, res) => {
    try {

        const products = await getAllProducts();
        if (!products) {
            return res.status(404).json({
                ok: false,
                error: "No existe ningun producto"
            });
        } else {
            return res.status(200).json({
                ok: true,
                error: "Productos encontrados",
                products
            })
        }

    } catch (error) {
        console.log("Error en registro:", error);
        return res.status(500).json({ ok: false, error: "Error interno del servidor" });
    }
}

/**
 * Recive todos los campos de un producto por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getProductByIdController = async (req, res) => {
    const { id } = req.params;

    try {

        const product = await getProductById(id);
        if (!product) {
            return res.status(404).json({
                ok: false,
                error: "No existe ningun producto con ese id"
            });
        } else {
            return res.status(200).json({
                ok: true,
                error: "Producto encontrado",
                product
            })
        }

    } catch (error) {
        console.log("Error en registro:", error);
        return res.status(500).json({ ok: false, error: "Error interno del servidor" });
    }
}

/**
 * Recive todos los campos de un producto por tipo
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getProductsByTypeController = async (req, res) => {
    const { tipo } = req.params;

    try {

        const products = await getProductsByType(tipo);
        if (!products) {
            return res.status(404).json({
                ok: false,
                error: "No existe ningun producto con ese tipo"
            });
        } else {
            return res.status(200).json({
                ok: true,
                error: "Productos encontrados",
                products
            })
        }

    } catch (error) {
        console.log("Error en registro:", error);
        return res.status(500).json({ ok: false, error: "Error interno del servidor" });
    }
}

/**
 * Crea un nuevo producto
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const createProductController = async (req, res) => {
    const { nombre, descripcion, tipo, unidad } = req.body;

    try {
        const products = await createProduct(nombre, descripcion, tipo, unidad);
        if (!products) {
            return res.status(404).json({
                ok: false,
                error: "No se ha podido crear el producto"
            });
        } else {
            return res.status(200).json({
                ok: true,
                error: "Productos encontrados",
                products
            })
        }

    } catch (error) {
        console.log("Error en registro:", error);
        return res.status(500).json({ ok: false, error: "Error interno del servidor" });
    }
}

/**
 * Actualiza un producto
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const updateProductByIdController = async (req, res) => {
    const id_producto = Number(req.params);

    const { nombre, descripcion, tipo, unidad } = req.body;

    try {
        const products = await updateProductById(nombre, descripcion, tipo, unidad, id_producto);
        if (!products) {
            return res.status(404).json({
                ok: false,
                error: "No se ha podido modificar el producto"
            });
        } else {
            return res.status(200).json({
                ok: true,
                error: "Producto modificado",
                products
            })
        }

    } catch (error) {
        console.log("Error en registro:", error);
        return res.status(500).json({ ok: false, error: "Error interno del servidor" });
    }
}

/**
 * Elimina un producto
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const deleteProductByIdController = async (req, res) => {
    const { id_producto } = Number(req.params);

    try {
        const products = await deleteProductById(id_producto);
        if (!products) {
            return res.status(404).json({
                ok: false,
                error: "No se ha podido eliminar el producto"
            });
        } else {
            return res.status(200).json({
                ok: true,
                error: "Producto eliminado",
                products
            })
        }
    } catch (error) {
        console.log("Error en registro:", error);
        return res.status(500).json({ ok: false, error: "Error interno del servidor" });
    }
}

module.exports = {
    getAllProductsController,
    getProductByIdController,
    getProductsByTypeController,
    createProductController,
    updateProductByIdController,
    deleteProductByIdController
}