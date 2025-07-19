const {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    getProductsByType,
    updateProductById
} = require("../models/products.models");

const getAllProductss = async (req, res) => {
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

const getProductoById = async (req, res) => {
    const { id } = req.body;

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

const getProductosByType = async (req, res) => {
    const { tipo } = req.body;

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

const createProducto = async (req, res) => {
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

const updateProductoById = async (req, res) => {
    const { nombre, descripcion, tipo, unidad, id } = req.body;

    try {
        const products = await updateProductById(nombre, descripcion, tipo, unidad, id);
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

const deleteProductoById = async (req, res) => {
    const { id } = req.body;

    try {
        const products = await deleteProductById(id);
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
    getAllProductss,
    getProductoById,
    getProductosByType,
    createProducto,
    updateProductoById,
    deleteProductoById
}