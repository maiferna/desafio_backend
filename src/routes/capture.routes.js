const express = require('express');
const router = express.Router();
const {
    getAllCapturesController,
    getCaptureByIdController,
    createCaptureController,
    updateCaptureController,
    deleteCaptureController
} = require('../controllers/captureController');

// GET /api/v1/captures
router.get('/', getAllCapturesController);

// GET /api/v1/captures/:id
router.get('/:id', getCaptureByIdController);

// POST /api/v1/captures
router.post('/', createCaptureController);

// PUT /api/v1/captures/:id
router.put('/:id', updateCaptureController);

// DELETE /api/v1/captures/:id
router.delete('/:id', deleteCaptureController);

module.exports = router;
