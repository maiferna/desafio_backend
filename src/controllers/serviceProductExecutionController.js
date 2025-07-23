const model = require('../models/serviceProductExecutionModel');

const getAllServiceProductExecutionsController = async (req, res) => {
    const result = await model.getAllServiceProductExecutions();
    if (!result) return res.status(404).json({ message: 'Service Product execution not found' });
    res.json(result);
};

const getServiceProductExecutionByIdController = async (req, res) => {
    const result = await model.getServiceProductExecutionById(req.params.id_ejecucion_producto);
    if (!result) return res.status(404).json({ message: 'Service Product execution not found' });
    res.json(result);
};

const getServiceProductExecutionsByServiceExecutionIdController = async (req, res) => {
    const result = await model.getServiceProductExecutionsByServiceExecutionId(req.params.id_ejecucion_servicio);
    if (result.length == 0) return res.status(404).json({ message: 'Service Product execution not found' });
    res.json(result);
};

const createServiceProductExecutionController = async (req, res) => {
    const result = await model.createServiceProductExecution(req.body);
    if (!result) return res.status(404).json({ message: 'Service Product execution not found' });
    res.status(201).json({
        ok: true,
        message: 'Service product created',
        result
    });
};

const updateServiceProductExecutionController = async (req, res) => {
    const result = await model.updateServiceProductExecution(req.params.id_ejecucion_producto, req.body);
    if (!result) return res.status(404).json({ message: 'Service Product execution not found' });
    res.json({
        ok: true,
        message: 'Service product updated',
        result
    });
};

const deleteServiceProductExecutionController = async (req, res) => {
    const result = await model.deleteServiceProductExecution(req.params.id);
    if (!result) return res.status(404).json({ message: 'Service Product execution not found' });
    res.json({
        ok: true,
        message: 'Service product deleted',
        result
    });
};

module.exports = {
    getAllServiceProductExecutionsController,
    getServiceProductExecutionByIdController,
    getServiceProductExecutionsByServiceExecutionIdController,
    createServiceProductExecutionController,
    updateServiceProductExecutionController,
    deleteServiceProductExecutionController
};
