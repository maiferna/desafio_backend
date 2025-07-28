const {
    getAllRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
    unassignVisitsFromRoute
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

        // Desasignar visitas de la ruta
        await unassignVisitsFromRoute(id);

        // Eliminar la ruta
        const deletedRoute = await deleteRoute(id);
        if (!deletedRoute) return res.status(404).json({ message: 'Route not found' });

        res.status(200).json({ message: 'Route deleted and visits unassigned', deletedRoute });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting route', error });
    }
};

const routesPlanification = async (req, res) => {
    console.log("aquiii")
    try {
        const planningData = req.body;
        console.log(JSON.stringify(planningData))
        const response = await fetch("http://localhost:5656/api/elementos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(planningData)
        });
        if (!response.ok) {
            throw new Error(`Microservice responded with status ${response.status}`);
        }

        const result = await response.json();
        console.log(result)
        console.log("result: ", result)
        console.log("resultado: ", result.resultado)
        console.log("rutas: ")
        res.status(200).json(
            {
                "rutas": result.resultado.rutas
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error planification route', error });
    }
}

module.exports = {
    getAllRoutesController,
    getRouteByIdController,
    createRouteController,
    updateRouteController,
    deleteRouteController,
    routesPlanification
};