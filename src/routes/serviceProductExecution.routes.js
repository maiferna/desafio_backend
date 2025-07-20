const express = require('express');
const router = express.Router();
const {
    getAllServiceProductExecutionsController,
    getServiceProductExecutionByIdController,
    getServiceProductExecutionsByServiceExecutionIdController,
    createServiceProductExecutionController,
    updateServiceProductExecutionController,
    deleteServiceProductExecutionController
} = require('../controllers/serviceProductExecutionController');

// GET /api/v1/service-product-executions
router.get('/', getAllServiceProductExecutionsController);

// GET /api/v1/service-product-executions/:id
router.get('/:id', getServiceProductExecutionByIdController);

// GET /api/v1/service-product-executions/service-execution/:serviceExecutionId
router.get('/service-execution/:serviceExecutionId', getServiceProductExecutionsByServiceExecutionIdController);

// POST /api/v1/service-product-executions
router.post('/', createServiceProductExecutionController);

// PUT /api/v1/service-product-executions/:id
router.put('/:id', updateServiceProductExecutionController);

// DELETE /api/v1/service-product-executions/:id
router.delete('/:id', deleteServiceProductExecutionController);

module.exports = router;
