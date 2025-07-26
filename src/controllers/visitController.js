const {
    getAllVisits,
    getVisitById,
    getVisitsByInstallationId,
    getVisitsByRouteId,
    createVisit,
    updateVisitStatus,
    deleteVisit,
    setVisitRoute,
    getVisitDetailsById,
    getVisitServiceExecutionsById,
    editVisitById
} = require('../models/visitModel');

const getAllVisitsController = async (req, res) => {
    try {
        const visits = await getAllVisits();
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching visits', error });
    }
};

const getVisitByIdController = async (req, res) => {
    try {
        const visit = await getVisitById(req.params.id);
        if (!visit) return res.status(404).json({ message: 'Visit not found' });
        res.status(200).json(visit);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching visit', error });
    }
};

const getVisitsByInstallationIdController = async (req, res) => {
    try {
        const visits = await getVisitsByInstallationId(req.params.installationId);
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching visits by installation', error });
    }
};

const getVisitsByRouteIdController = async (req, res) => {
    try {
        const visits = await getVisitsByRouteId(req.params.routeId);
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching visits by route', error });
    }
};

const editVisitByIdController = async (req, res) => {
    try {
        const { id_instalacion, id_ruta, estado } = req.body;
        const visit = await editVisitById(id_instalacion, id_ruta, estado, req.params.id);
        if (!visit) return res.status(404).json({ message: 'Visit not found' });
        res.status(200).json(visit);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching visit', error });
    }
};

const createVisitController = async (req, res) => {
    console.log({ req })
    try {
        const { id_instalacion, id_ruta, estado } = req.body;
        const newVisit = await createVisit({ id_instalacion, id_ruta, estado });
        res.status(201).json(newVisit);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating visit', error });
    }
};

const updateVisitStatusController = async (req, res) => {
    try {
        const { estado } = req.body;
        const updatedVisit = await updateVisitStatus(estado, req.params.id);
        if (!updatedVisit) return res.status(404).json({ message: 'Visit not found' });
        res.status(200).json(updatedVisit);
    } catch (error) {
        res.status(500).json({ message: 'Error updating visit status', error });
    }
};

const setVisitRouteController = async (req, res) => {
    try {
        const { id } = req.params;
        const { routeId } = req.body;
        const updatedVisit = await setVisitRoute(routeId, id);
        if (!updatedVisit) return res.status(404).json({ message: 'Visit not found' });
        res.status(200).json(updatedVisit);
    } catch (error) {
        res.status(500).json({ message: 'Error setting visit route', error });
    }
};

const deleteVisitController = async (req, res) => {
    try {
        const deletedVisit = await deleteVisit(req.params.id);
        if (!deletedVisit) return res.status(404).json({ message: 'Visit not found' });
        res.status(200).json(deletedVisit);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting visit', error });
    }
};

const getVisitDetailsByIdController = async (req, res) => {
    try {
        const visit = await getVisitDetailsById(req.params.id);
        if (!visit) return res.status(404).json({ message: 'Visit not found' });
        console.log(visit)
        res.status(200).json({
            ok: true,
            data: visit
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching visit', error });
    }
}


const getVisitServiceExecutionByIdController = async (req, res) => {
    try {
        const visit = await getVisitServiceExecutionsById(req.params.id);
        if (visit) return res.status(404).json({ message: 'Service executions not found' });
        res.status(200).json({
            ok: true,
            data: visit
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching visit', error });
    }
}

module.exports = {
    getAllVisitsController,
    getVisitByIdController,
    getVisitsByInstallationIdController,
    getVisitsByRouteIdController,
    createVisitController,
    updateVisitStatusController,
    deleteVisitController,
    setVisitRouteController,
    getVisitDetailsByIdController,
    getVisitServiceExecutionByIdController,
    editVisitByIdController
};