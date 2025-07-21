const {
    getAllServices,
    getServiceById,
    createService,
    updateServiceById,
    deleteServiceById,
} = require('../models/serviceModel');

const getAllServicesController = async (req, res) => {
    try {
        const services = await getAllServices();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error });
    }
};

const getServiceByIdController = async (req, res) => {
    try {
        const service = await getServiceById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service', error });
    }
};

const createServiceController = async (req, res) => {
    try {
        const { nombre, descripcion, datos } = req.body;
        const newService = await createService({ nombre, descripcion, datos });
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
};

const updateServiceController = async (req, res) => {
    try {
        const { nombre, descripcion, datos } = req.body;
        const id = req.params.id;
        const updatedService = await updateServiceById(id, { nombre, descripcion, datos });
        if (!updatedService) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service', error });
    }
};

const deleteServiceController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedService = await deleteServiceById(id);
        if (!deletedService) return res.status(404).json({ message: 'Service not found' });
        res.status(200).json({ message: 'Service deleted', deletedService });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service', error });
    }
};

module.exports = {
    getAllServicesController,
    getServiceByIdController,
    createServiceController,
    updateServiceController,
    deleteServiceController,
};
