const {
    getAllServiceExecutions,
    getServiceExecutionById,
    getServiceExecutionsByVisitId,
    createServiceExecution,
    updateServiceExecutionById,
    deleteServiceExecutionById,
} = require('../models/serviceExecutionModel');

// GET /api/v1/service-executions
const getAllServiceExecutionsController = async (req, res) => {
    try {
        const executions = await getAllServiceExecutions();
        res.status(200).json(executions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service executions', error });
    }
};

// GET /api/v1/service-executions/:id
const getServiceExecutionByIdController = async (req, res) => {
    try {
        const execution = await getServiceExecutionById(req.params.id);
        if (!execution) return res.status(404).json({ message: 'Service execution not found' });
        res.status(200).json(execution);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service execution', error });
    }
};

// GET /api/v1/service-executions/visit/:visitId
const getServiceExecutionsByVisitIdController = async (req, res) => {
    try {
        const executions = await getServiceExecutionsByVisitId(req.params.visitId);
        res.status(200).json(executions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service executions by visit', error });
    }
};

// POST /api/v1/service-executions
const createServiceExecutionController = async (req, res) => {
    try {
        const { id_visita, id_servicio, observaciones, datos } = req.body;
        const newExecution = await createServiceExecution({ id_visita, id_servicio, observaciones, datos });
        res.status(201).json(newExecution);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service execution', error });
    }
};

// PUT /api/v1/service-executions/:id
const updateServiceExecutionController = async (req, res) => {
    try {
        const id = req.params.id;
        const { id_visita, id_servicio, observaciones, datos } = req.body;
        const updatedExecution = await updateServiceExecutionById(id, { id_visita, id_servicio, observaciones, datos });
        if (!updatedExecution) return res.status(404).json({ message: 'Service execution not found' });
        res.status(200).json(updatedExecution);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service execution', error });
    }
};

// DELETE /api/v1/service-executions/:id
const deleteServiceExecutionController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedExecution = await deleteServiceExecutionById(id);
        if (!deletedExecution) return res.status(404).json({ message: 'Service execution not found' });
        res.status(200).json({ message: 'Service execution deleted', deletedExecution });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service execution', error });
    }
};

module.exports = {
    getAllServiceExecutionsController,
    getServiceExecutionByIdController,
    getServiceExecutionsByVisitIdController,
    createServiceExecutionController,
    updateServiceExecutionController,
    deleteServiceExecutionController,
};
