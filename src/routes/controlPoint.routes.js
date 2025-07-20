const express = require('express');
const router = express.Router();
const {
    getAllControlPointsController,
    getControlPointByIdController,
    getControlPointsByInstallationIdController,
    createControlPointController,
    updateControlPointController,
    deleteControlPointController
} = require('../controllers/controlPointController');

// GET all control points
router.get('/', getAllControlPointsController);

// GET control point by ID
router.get('/:id', getControlPointByIdController);

// GET control points by installation ID
router.get('/installation/:installationId', getControlPointsByInstallationIdController);

// CREATE new control point
router.post('/', createControlPointController);

// UPDATE control point
router.put('/:id', updateControlPointController);

// DELETE control point
router.delete('/:id', deleteControlPointController);

module.exports = router;
