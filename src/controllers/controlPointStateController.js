const {
    getAllControlPointStates,
    getControlPointStateById,
    createControlPointState,
    updateControlPointState,
    deleteControlPointState,
} = require('../models/controlPointStateModel');

const getAllControlPointStatesController = async (req, res) => {
    try {
        const states = await getAllControlPointStates();
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching control point states', error });
    }
};

const getControlPointStateByIdController = async (req, res) => {
    try {
        const state = await getControlPointStateById(req.params.id);
        if (!state) return res.status(404).json({ message: 'Control point state not found' });
        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching control point state', error });
    }
};

const createControlPointStateController = async (req, res) => {
    try {
        const newState = await createControlPointState(req.body);
        res.status(201).json(newState);
    } catch (error) {
        res.status(500).json({ message: 'Error creating control point state', error });
    }
};

const updateControlPointStateController = async (req, res) => {
    try {
        const updatedState = await updateControlPointState(req.params.id, req.body);
        if (!updatedState) return res.status(404).json({ message: 'Control point state not found' });
        res.status(200).json(updatedState);
    } catch (error) {
        res.status(500).json({ message: 'Error updating control point state', error });
    }
};

const deleteControlPointStateController = async (req, res) => {
    try {
        const deletedState = await deleteControlPointState(req.params.id);
        if (!deletedState) return res.status(404).json({ message: 'Control point state not found' });
        res.status(200).json(deletedState);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting control point state', error });
    }
};

module.exports = {
    getAllControlPointStatesController,
    getControlPointStateByIdController,
    createControlPointStateController,
    updateControlPointStateController,
    deleteControlPointStateController,
};
