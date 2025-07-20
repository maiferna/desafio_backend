const express = require('express');
const router = express.Router();

// Importar subrutas
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./products.routes')


router.use('/auth', authRoutes);             // login y registro
router.use('/users', userRoutes);
router.use('/auth', authRoutes);             // login y registro
router.use('/users', userRoutes);
router.use("/products", productRoutes);



// EXPORTS
module.exports = router;