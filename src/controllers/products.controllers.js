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

const getProductsById = async (req, res) => {
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