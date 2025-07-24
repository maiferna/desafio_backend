const express = require("express");
const router = express.Router();
const {
    getAllClientsHandler,
    getClientByIdHandler,
    createClientHandler,
    updateClientHandler,
    deleteClientHandler,
    getClientInstallationsHandler,
} = require("../controllers/clientController");
const { validateJwt, validateRole } = require("../middlewares");

// GET /api/v1/clients
router.get("/", getAllClientsHandler);

// GET /api/v1/clients/:id
router.get("/:id", getClientByIdHandler);

// POST /api/v1/clients
router.post("/", validateJwt,
    validateRole("admin"), createClientHandler);

// PUT /api/v1/clients/:id
router.put("/:id", updateClientHandler);

// DELETE /api/v1/clients/:id
router.delete("/:id", deleteClientHandler);

// GET /api/v1/clients/:id/installations
router.get("/:id/installations", getClientInstallationsHandler);

module.exports = router;