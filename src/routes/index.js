const express = require('express');
const router = express.Router();

// Importar subrutas
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);             // login y registro
router.use('/users', userRoutes);

// EXPORTS
module.exports = router;