const model = require('../models/serviceProductExecutionModel');

const getAllServiceProductExecutionsController = async (req, res) => {
    const result = await model.getAllServiceProductExecutions();
    res.json(result);
};

const getServiceProductExecutionByIdController = async (req, res) => {
    const result = await model.getServiceProductExecutionById(req.params.id);
    res.json(result);
};

const getServiceProductExecutionsByServiceExecutionIdController = async (req, res) => {
    const result = await model.getServiceProductExecutionsByServiceExecutionId(req.params.serviceExecutionId);
    res.json(result);
};

const createServiceProductExecutionController = async (req, res) => {
    const result = await model.createServiceProductExecution(req.body);
    res.status(201).json(result);
};

const updateServiceProductExecutionController = async (req, res) => {
    const result = await model.updateServiceProductExecution(req.params.id, req.body);
    res.json(result);
};

const deleteServiceProductExecutionController = async (req, res) => {
    const result = await model.deleteServiceProductExecution(req.params.id);
    res.json(result);
};

module.exports = {
    getAllServiceProductExecutionsController,
    getServiceProductExecutionByIdController,
    getServiceProductExecutionsByServiceExecutionIdController,
    createServiceProductExecutionController,
    updateServiceProductExecutionController,
    deleteServiceProductExecutionController
};
