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
} = require('../controllers/installationController');

// GET /api/v1/installations
router.get('/', validateJwt, getAllInstallationsController);

// GET /api/v1/installations/:id
router.get('/:id', validateJwt, getInstallationByIdController);

// GET /api/v1/installations/client/:clientId
router.get('/client/:clientId', validateJwt, getInstallationsByClientController);

// POST /api/v1/installations
router.post('/', [validateJwt, validateInput], createInstallationController);

// PUT /api/v1/installations/:id
router.put('/:id', [validateJwt, validateInput], updateInstallationController);

// DELETE /api/v1/installations/:id
router.delete('/:id', validateJwt, deleteInstallationController);

module.exports = router;
