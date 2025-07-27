const {
    getAllControlPoints,
    getControlPointById,
    getControlPointsByInstallationId,
    createControlPoint,
    updateControlPoint,
    deleteControlPoint
} = require('../models/controlPointModel');

const getAllControlPointsController = async (req, res) => {
    const result = await getAllControlPoints();
    res.json(result);
};

const getControlPointByIdController = async (req, res) => {
    const result = await getControlPointById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Control point not found' });
    res.json(result);
};

const getControlPointsByInstallationIdController = async (req, res) => {
    try {
        const result = await getControlPointsByInstallationId(req.params.installationId);

        res.status(200).json({
            ok: true,
            data: result
        });
    } catch (error) {

    }

};

const createControlPointController = async (req, res) => {
    const result = await createControlPoint(req.body);
    res.status(201).json(result);
};

const updateControlPointController = async (req, res) => {
    const result = await updateControlPoint(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: 'Control point not found' });
    res.json(result);
};

const deleteControlPointController = async (req, res) => {
    const result = await deleteControlPoint(req.params.id);
    if (!result) return res.status(404).json({ message: 'Control point not found' });
    res.json(result);
};

module.exports = {
    getAllControlPointsController,
    getControlPointByIdController,
    getControlPointsByInstallationIdController,
    createControlPointController,
    updateControlPointController,
    deleteControlPointController
};
