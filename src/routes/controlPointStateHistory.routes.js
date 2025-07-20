const express = require('express');
const router = express.Router();
const {
    getAllControlPointStateHistoryController,
    getControlPointStateHistoryByIdController,
    getControlPointStateHistoryByControlPointIdController,
    createControlPointStateHistoryController,
    updateControlPointStateHistoryController,
    deleteControlPointStateHistoryController
} = require('../controllers/controlPointStateHistoryController');

// GET all state history entries
router.get('/', getAllControlPointStateHistoryController);

// GET by ID
router.get('/:id', getControlPointStateHistoryByIdController);

// GET by control point
router.get('/control-point/:controlPointId', getControlPointStateHistoryByControlPointIdController);

// CREATE
router.post('/', createControlPointStateHistoryController);

// UPDATE
router.put('/:id', updateControlPointStateHistoryController);

// DELETE
router.delete('/:id', deleteControlPointStateHistoryController);

module.exports = router;
