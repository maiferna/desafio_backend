const express = require('express');
const router = express.Router();
const {
    getAllServicesController,
    getServiceByIdController,
    createServiceController,
    updateServiceController,
    deleteServiceController,
} = require('../controllers/serviceController');

// GET /api/v1/services
router.get('/', getAllServicesController);

// GET /api/v1/services/:id
router.get('/:id', getServiceByIdController);

// POST /api/v1/services
router.post('/', createServiceController);

// PUT /api/v1/services/:id
router.put('/:id', updateServiceController);

// DELETE /api/v1/services/:id
router.delete('/:id', deleteServiceController);

module.exports = router;
