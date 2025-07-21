const express = require('express');
const router = express.Router();
const { validateInput, validateJwt } = require('../middlewares/index.js');
const {
    getAllInstallationsController,
    getInstallationByIdController,
    getInstallationsByClientController,
    createInstallationController,
    updateInstallationController,
    deleteInstallationController,
} = require('../controllers/installationController.js');

// GET /api/v1/installations
router.get('/', getAllInstallationsController);

// GET /api/v1/installations/:id
router.get('/:id', getInstallationByIdController);

// GET /api/v1/installations/client/:clientId
router.get('/client/:clientId', getInstallationsByClientController);

// POST /api/v1/installations
router.post('/', createInstallationController);

// PUT /api/v1/installations/:id
router.put('/:id', updateInstallationController);

// DELETE /api/v1/installations/:id
router.delete('/:id', deleteInstallationController);

module.exports = router;
