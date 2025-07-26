const express = require('express');
const router = express.Router();
const {
    getAllVisitsController,
    getVisitByIdController,
    getVisitsByInstallationIdController,
    getVisitsByRouteIdController,
    createVisitController,
    updateVisitStatusController,
    deleteVisitController,
    setVisitRouteController,
    getVisitDetailsByIdController,
    getVisitServiceExecutionByIdController,
    editVisitByIdController
} = require('../controllers/visitController');

// GET /api/v1/visits
router.get('/', getAllVisitsController);

// GET /api/v1/visits/:id
router.get('/:id', getVisitByIdController);

// GET /api/v1/visits/installation/:installationId
router.get('/installation/:installationId', getVisitsByInstallationIdController);

// GET /api/v1/visits/route/:routeId
router.get('/route/:routeId', getVisitsByRouteIdController);

// POST /api/v1/visits
router.post('/', createVisitController);

// PUT /api/v1/visits/:id/status
router.put('/:id/status', updateVisitStatusController);

// PUT /api/v1/visits/:id/route
router.put('/:id/route', setVisitRouteController);

// PUT /api/v1/visits/:id
router.put('/:id', editVisitByIdController);

// DELETE /api/v1/visits/:id
router.delete('/:id', deleteVisitController);

//GET /api/v1/visits/details:id
router.get('/details/:id', getVisitDetailsByIdController);

//GET /api/v1/visits/service-executions/:id
router.get('/service-executions/:id', getVisitServiceExecutionByIdController);

module.exports = router;