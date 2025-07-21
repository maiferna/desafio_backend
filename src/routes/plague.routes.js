const express = require('express');
const router = express.Router();
const {
    getAllPlaguesController,
    getPlagueByIdController,
    createPlagueController,
    updatePlagueController,
    deletePlagueController
} = require('../controllers/plagueController');

// GET /api/v1/plagues
router.get('/', getAllPlaguesController);

// GET /api/v1/plagues/:id
router.get('/:id', getPlagueByIdController);

// POST /api/v1/plagues
router.post('/', createPlagueController);

// PUT /api/v1/plagues/:id
router.put('/:id', updatePlagueController);

// DELETE /api/v1/plagues/:id
router.delete('/:id', deletePlagueController);

module.exports = router;
