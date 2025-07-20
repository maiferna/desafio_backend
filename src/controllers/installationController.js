const {
    getAllInstallations,
    getInstallationById,
    getInstallationsByClientId,
    createInstallation,
    updateInstallation,
    deleteInstallation,
} = require('../models/installationModel');

const getAllInstallationsController = async (req, res) => {
    const data = await getAllInstallations();
    res.json(data);
};

const getInstallationByIdController = async (req, res) => {
    const data = await getInstallationById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Installation not found' });
    res.json(data);
};

const getInstallationsByClientController = async (req, res) => {
    const data = await getInstallationsByClientId(req.params.clientId);
    res.json(data);
};

const createInstallationController = async (req, res) => {
    const newInstallation = await createInstallation(req.body);
    res.status(201).json(newInstallation);
};

const updateInstallationController = async (req, res) => {
    const updated = await updateInstallation(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Installation not found' });
    res.json(updated);
};

const deleteInstallationController = async (req, res) => {
    const deleted = await deleteInstallation(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Installation not found' });
    res.json(deleted);
};

module.exports = {
    getAllInstallationsController,
    getInstallationByIdController,
    getInstallationsByClientController,
    createInstallationController,
    updateInstallationController,
    deleteInstallationController,
};
