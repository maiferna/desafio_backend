const express = require('express');
const router = express.Router();
const {
    getAllControlPointGroupsController,
    getControlPointGroupByIdController,
    createControlPointGroupController,
    updateControlPointGroupController,
    deleteControlPointGroupController
} = require('../controllers/controlPointGroupController');

// GET /api/v1/control-point-groups
router.get('/', getAllControlPointGroupsController);

// GET /api/v1/control-point-groups/:id
router.get('/:id', getControlPointGroupByIdController);

// POST /api/v1/control-point-groups
router.post('/', createControlPointGroupController);

// PUT /api/v1/control-point-groups/:id
router.put('/:id', updateControlPointGroupController);

// DELETE /api/v1/control-point-groups/:id
router.delete('/:id', deleteControlPointGroupController);

module.exports = router;
