const {
    getAllControlPointGroups,
    getControlPointGroupById,
    createControlPointGroup,
    updateControlPointGroup,
    deleteControlPointGroup,
} = require('../models/controlPointGroupModel');

const getAllControlPointGroupsController = async (req, res) => {
    try {
        const groups = await getAllControlPointGroups();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching control point groups', error });
    }
};

const getControlPointGroupByIdController = async (req, res) => {
    try {
        const group = await getControlPointGroupById(req.params.id);
        if (!group) return res.status(404).json({ message: 'Control point group not found' });
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching control point group', error });
    }
};

const createControlPointGroupController = async (req, res) => {
    try {
        const newGroup = await createControlPointGroup(req.body);
        res.status(201).json(newGroup);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating control point group', error });
    }
};

const updateControlPointGroupController = async (req, res) => {
    try {
        const updatedGroup = await updateControlPointGroup(req.params.id, req.body);
        if (!updatedGroup) return res.status(404).json({ message: 'Control point group not found' });
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(500).json({ message: 'Error updating control point group', error });
    }
};

const deleteControlPointGroupController = async (req, res) => {
    try {
        const deletedGroup = await deleteControlPointGroup(req.params.id);
        if (!deletedGroup) return res.status(404).json({ message: 'Control point group not found' });
        res.status(200).json(deletedGroup);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting control point group', error });
    }
};

module.exports = {
    getAllControlPointGroupsController,
    getControlPointGroupByIdController,
    createControlPointGroupController,
    updateControlPointGroupController,
    deleteControlPointGroupController,
};
