const {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
} = require('../models/routeModel');

// GET /api/v1/routes
const getAllRoutesController = async (req, res) => {
    try {
        const routes = await getAllRoutes();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching routes', error });
    }
};

// GET /api/v1/routes/:id
const getRouteByIdController = async (req, res) => {
    try {
        const route = await getRouteById(req.params.id);
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching route', error });
    }
};

// POST /api/v1/routes
const createRouteController = async (req, res) => {
    try {
        const { tecnico_responsable, tecnico, tecnico_asistente, fecha } = req.body;
        const newRoute = await createRoute({ tecnico_responsable, tecnico, tecnico_asistente, fecha });
        res.status(201).json(newRoute);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating route', error });
    }
};

// PUT /api/v1/routes/:id
const updateRouteController = async (req, res) => {
    try {
        const id = req.params.id;
        const { tecnico_responsable, tecnico, tecnico_asistente, fecha } = req.body;
        const updatedRoute = await updateRoute(id, { tecnico_responsable, tecnico, tecnico_asistente, fecha });
        if (!updatedRoute) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json(updatedRoute);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error updating route', error });
    }
};

// DELETE /api/v1/routes/:id
const deleteRouteController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedRoute = await deleteRoute(id);
        if (!deletedRoute) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json({ message: 'Route deleted', deletedRoute });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting route', error });
    }
};

module.exports = {
    getAllRoutesController,
    getRouteByIdController,
    createRouteController,
    updateRouteController,
    deleteRouteController,
};
