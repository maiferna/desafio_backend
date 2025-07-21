const {
    getAllPlagues,
    getPlagueById,
    createPlague,
    updatePlague,
    deletePlague
} = require('../models/plagueModel');

const getAllPlaguesController = async (req, res) => {
    try {
        const plagues = await getAllPlagues();
        res.status(200).json(plagues);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plagues', error });
    }
};

const getPlagueByIdController = async (req, res) => {
    try {
        const plague = await getPlagueById(req.params.id);
        if (!plague) return res.status(404).json({ message: 'Plague not found' });
        res.status(200).json(plague);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching plague', error });
    }
};

const createPlagueController = async (req, res) => {
    try {
        const newPlague = await createPlague(req.body);
        res.status(201).json(newPlague);
    } catch (error) {
        res.status(500).json({ message: 'Error creating plague', error });
    }
};

const updatePlagueController = async (req, res) => {
    try {
        const updatedPlague = await updatePlague(req.params.id, req.body);
        if (!updatedPlague) return res.status(404).json({ message: 'Plague not found' });
        res.status(200).json(updatedPlague);
    } catch (error) {
        res.status(500).json({ message: 'Error updating plague', error });
    }
};

const deletePlagueController = async (req, res) => {
    try {
        const deletedPlague = await deletePlague(req.params.id);
        if (!deletedPlague) return res.status(404).json({ message: 'Plague not found' });
        res.status(200).json(deletedPlague);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting plague', error });
    }
};

module.exports = {
    getAllPlaguesController,
    getPlagueByIdController,
    createPlagueController,
    updatePlagueController,
    deletePlagueController,
};
