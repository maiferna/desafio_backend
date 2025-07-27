const express = require('express');
const router = express.Router();
const {
    getAllControlPointStateHistoryController,
    getControlPointStateHistoryByIdController,
    getControlPointStateHistoryByControlPointIdController,
    createControlPointStateHistoryController,
    updateControlPointStateHistoryController,
    deleteControlPointStateHistoryController,
    getControlPointStateHistoryByVisitIdController
} = require('../controllers/controlPointStateHistoryController');

// GET /api/v1/control-point-state-history
router.get('/', getAllControlPointStateHistoryController);

// GET /api/v1/control-point-state-history/:id
router.get('/:id', getControlPointStateHistoryByIdController);

// GET /api/v1/control-point-state-history/control-point/:controlPointId
router.get('/control-point/:controlPointId', getControlPointStateHistoryByControlPointIdController);

// GET /api/v1/control-point-state-history/visit/:visitId
router.get('/visit/:visitId', getControlPointStateHistoryByVisitIdController);

// POST /api/v1/control-point-state-history
router.post('/', createControlPointStateHistoryController);

// PUT /api/v1/control-point-state-history/:id
router.put('/:id', updateControlPointStateHistoryController);

// DELETE /api/v1/control-point-state-history/:id
router.delete('/:id', deleteControlPointStateHistoryController);

module.exports = router;
