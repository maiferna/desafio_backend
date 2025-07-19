const dbConnection = require('../utils/dbConnectionUtil');
const { dbQuery } = require('../utils/dbQueryUtil');
const {
    products
} = require("../queries/productQueries");


/**
 * Ver todos los productos
 * @returns todos los productos
 */
const getAllProducts = async () => {
    const { rows } = await dbConnection.query(products.getAllProducts);
    return rows;
};

/**
 * Recibir los productos por tipo de producto
 * @param {*} type tipo de producto
 * @returns datos recividos
 */
const getProductsByType = async (type) => {
    const { rows } = await dbConnection.query(products.getProductsByType, [type]);
    return rows;
}

/**
 * Recibir producto por id de producto
 * @param {*} id id de producto
 * @returns datos del producto
 */
const getProductById = async (id) => {
    const { rows } = await dbConnection.query(products.getProductById, [type]);
    return rows[0];
}

/**
 * Crear productos
 * @param {*} param0 Datos de insercion
 * @returns Datos insertados
 */
const createProduct = async ({ product_name, product_description, product_type, product_cuantity_tipe, product_cuantity }) => {
    const values = [product_name, product_description, product_type, product_cuantity_tipe, product_cuantity];
    const result = await dbQuery(products.insertProducts, values);
    return result.rows[0];
};

/**
 * Actualizar producto por id
 * @param {*} param0 datos para actualizar el producto
 * @returns datos modificados
 */
const updateProductById = async ({ product_name, product_description, product_type, product_cuantity_tipe, product_cuantity, user_id }) => {
    const values = [product_name, product_description, product_type, product_cuantity_tipe, product_cuantity, user_id];
    const result = await dbQuery(products.updateProductById, values);
    return result.rows[0] || null;
};

/**
 * Eliminar producto por id
 * @param {*} id id del producto
 * @returns datos eliminados
 */
const deleteProductById = async (id) => {
    const { rows } = await dbConnection.query(products.deleteProductById, [id]);
    return rows[0];
};


module.exports = {
    getAllProducts,
    getProductsByType,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}