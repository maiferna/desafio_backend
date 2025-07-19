const products = {

    /**
     * QUERIE: 1. Recibir producto por id
     */
    getProductById: `
            SELECT * FROM productos 
            WHERE id_producto = $1
            `,

    /**
     *  QUERIE: 2. Recibir productos por tipo 
     * */
    getProductsByType: `
            SELECT * FROM productos 
            WHERE tipo = $1
            `,

    /**
     * QUERIE: 3. Recibir todos los productos
     */
    getAllProducts: `
            SELECT * FROM productos
            `,

    /**
     * QUERIE: 4. Insertar nuevo producto
     */
    insertProducts: `
                    INSERT INTO productos (nombre, descripcion, tipo, unidad) 
                    VALUES($1, $2, $3, $4) 
                    RETURNING *
                    `,

    /**
     * QUERIE: 5. Eliminar un producto por id 
     *  */
    deleteProductById: `
                    DELETE FROM productos 
                    WHERE id_producto = $1
                    RETURNING *
                    `,

    /**
     * QUERIE: 6. Modificar un producto por id
     */
    updateProductById: `
                    UPDATE productos SET nombre = $1, descripcion = $2, tipo = $3, unidad = $4
                    WHERE id_producto = $5
                    RETURNING *
                    `,
}


module.exports = {
    products
}
