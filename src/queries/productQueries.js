const products = {

    /**
     * QUERIE: 1. Recibir producto por id
     */
    getProductById: `
            SELECT * FROM products 
            WHERE id_product = $1
            `,

    /**
     *  QUERIE: 2. Recibir productos por tipo 
     * */
    getProductsByType: `
            SELECT * FROM products 
            WHERE type = $1
            `,

    /**
     * QUERIE: 3. Recibir todos los productos
     */
    getAllProducts: `
            SELECT * FROM products
            `,

    /**
     * QUERIE: 4. Insertar nuevo producto
     */
    insertProducts: `
                    INSERT INTO products (name, description, type, unity, cuantity) 
                    VALUES($1, $2, $3, $4, $5) 
                    RETURNING *
                    `,

    /**
     * QUERIE: 5. Eliminar un producto por id 
     *  */
    deleteProductById: `
                    DELETE FROM products 
                    WHERE id_product = $1
                    RETURNING *
                    `,

    /**
     * QUERIE: 6. Modificar un producto por id
     */
    updateProductById: `
                    UPDATE products SET name = $1, description = $2, type = $3, unity = $4, cuantity = $5
                    WHERE id_product = $6
                    RETURNING *
                    `,
}


module.exports = {
    products
}
