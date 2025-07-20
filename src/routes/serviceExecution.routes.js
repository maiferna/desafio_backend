const express = require('express');
const router = express.Router();

const {
    getAllServiceExecutionsController,
    getServiceExecutionByIdController,
    getServiceExecutionsByVisitIdController,
    createServiceExecutionController,
    updateServiceExecutionController,
    deleteServiceExecutionController,
} = require('../controllers/serviceExecutionController');

// GET /api/v1/service-executions
router.get('/', getAllServiceExecutionsController);

// GET /api/v1/service-executions/:id
router.get('/:id', getServiceExecutionByIdController);

// GET /api/v1/service-executions/visit/:visitId
router.get('/visit/:visitId', getServiceExecutionsByVisitIdController);

// POST /api/v1/service-executions
router.post('/', createServiceExecutionController);

// PUT /api/v1/service-executions/:id
router.put('/:id', updateServiceExecutionController);

// DELETE /api/v1/service-executions/:id
router.delete('/:id', deleteServiceExecutionController);

module.exports = router;
