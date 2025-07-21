const express = require('express');
const router = express.Router();

const {
    getAllRoutesController,
    getRouteByIdController,
    createRouteController,
    updateRouteController,
    deleteRouteController,
} = require('../controllers/routeController');

// GET /api/v1/routes
router.get('/', getAllRoutesController);

// GET /api/v1/routes/:id
router.get('/:id', getRouteByIdController);

// POST /api/v1/routes
router.post('/', createRouteController);

// PUT /api/v1/routes/:id
router.put('/:id', updateRouteController);

// DELETE /api/v1/routes/:id
router.delete('/:id', deleteRouteController);

module.exports = router;
