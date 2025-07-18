const express = require('express');
const router = express.Router();

// Importar subrutas
const authRoutes = require('./authRoutes');

router.use('/auth', authRoutes);             // login y registro

// EXPORTS
module.exports = router;