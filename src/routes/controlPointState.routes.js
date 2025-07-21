const express = require('express');
const router = express.Router();
const {
    getAllControlPointStatesController,
    getControlPointStateByIdController,
    createControlPointStateController,
    updateControlPointStateController,
    deleteControlPointStateController
} = require('../controllers/controlPointStateController');

// GET /api/v1/control-point-states
router.get('/', getAllControlPointStatesController);

// GET /api/v1/control-point-states/:id
router.get('/:id', getControlPointStateByIdController);

// POST /api/v1/control-point-states
router.post('/', createControlPointStateController);

// PUT /api/v1/control-point-states/:id
router.put('/:id', updateControlPointStateController);

// DELETE /api/v1/control-point-states/:id
router.delete('/:id', deleteControlPointStateController);

module.exports = router;
