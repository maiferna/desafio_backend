const {
    getAllCaptures,
    getCaptureById,
    createCapture,
    updateCapture,
    deleteCapture
} = require('../models/captureModel');

const getAllCapturesController = async (req, res) => {
    try {
        const captures = await getAllCaptures();
        res.status(200).json(captures);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching captures', error });
    }
};

const getCaptureByIdController = async (req, res) => {
    try {
        const capture = await getCaptureById(req.params.id);
        if (!capture) return res.status(404).json({ message: 'Capture not found' });
        res.status(200).json(capture);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching capture', error });
    }
};

const createCaptureController = async (req, res) => {
    try {
        const newCapture = await createCapture(req.body);
        res.status(201).json(newCapture);
    } catch (error) {
        res.status(500).json({ message: 'Error creating capture', error });
    }
};

const updateCaptureController = async (req, res) => {
    try {
        const updatedCapture = await updateCapture(req.params.id, req.body);
        if (!updatedCapture) return res.status(404).json({ message: 'Capture not found' });
        res.status(200).json(updatedCapture);
    } catch (error) {
        res.status(500).json({ message: 'Error updating capture', error });
    }
};

const deleteCaptureController = async (req, res) => {
    try {
        const deletedCapture = await deleteCapture(req.params.id);
        if (!deletedCapture) return res.status(404).json({ message: 'Capture not found' });
        res.status(200).json(deletedCapture);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting capture', error });
    }
};

module.exports = {
    getAllCapturesController,
    getCaptureByIdController,
    createCaptureController,
    updateCaptureController,
    deleteCaptureController
};
