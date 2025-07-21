const {
    getAllControlPointStateHistory,
    getControlPointStateHistoryById,
    getControlPointStateHistoryByControlPointId,
    createControlPointStateHistory,
    updateControlPointStateHistory,
    deleteControlPointStateHistory
} = require('../models/controlPointStateHistoryModel');

const getAllControlPointStateHistoryController = async (req, res) => {
    const result = await getAllControlPointStateHistory();
    res.json(result);
};

const getControlPointStateHistoryByIdController = async (req, res) => {
    const result = await getControlPointStateHistoryById(req.params.id);
    if (!result) return res.status(404).json({ message: 'State history not found' });
    res.json(result);
};

const getControlPointStateHistoryByControlPointIdController = async (req, res) => {
    const result = await getControlPointStateHistoryByControlPointId(req.params.controlPointId);
    res.json(result);
};

const createControlPointStateHistoryController = async (req, res) => {
    const result = await createControlPointStateHistory(req.body);
    res.status(201).json(result);
};

const updateControlPointStateHistoryController = async (req, res) => {
    const result = await updateControlPointStateHistory(req.params.id, req.body);
    if (!result) return res.status(404).json({ message: 'State history not found' });
    res.json(result);
};

const deleteControlPointStateHistoryController = async (req, res) => {
    const result = await deleteControlPointStateHistory(req.params.id);
    if (!result) return res.status(404).json({ message: 'State history not found' });
    res.json(result);
};

module.exports = {
    getAllControlPointStateHistoryController,
    getControlPointStateHistoryByIdController,
    getControlPointStateHistoryByControlPointIdController,
    createControlPointStateHistoryController,
    updateControlPointStateHistoryController,
    deleteControlPointStateHistoryController
};
