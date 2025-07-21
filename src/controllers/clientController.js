const {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    getClientInstallations,
} = require("../models/clientModel");

const getAllClientsHandler = async (req, res) => {
    try {
        const clients = await getAllClients();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving clients", error: err });
    }
};

const getClientByIdHandler = async (req, res) => {
    try {
        const client = await getClientById(req.params.id);
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.json(client);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving client", error: err });
    }
};

const createClientHandler = async (req, res) => {
    try {
        const newClient = await createClient(req.body);
        res.status(201).json(newClient);
    } catch (err) {
        res.status(500).json({ message: "Error creating client", error: err });
    }
};

const updateClientHandler = async (req, res) => {
    try {
        const updatedClient = await updateClient(req.params.id, req.body);
        if (!updatedClient) return res.status(404).json({ message: "Client not found" });
        res.json(updatedClient);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error updating client", error: err });
    }
};

const deleteClientHandler = async (req, res) => {
    try {
        const deleted = await deleteClient(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Client not found" });
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ message: "Error deleting client", error: err });
    }
};

const getClientInstallationsHandler = async (req, res) => {
    try {
        const installations = await getClientInstallations(req.params.id);
        res.json(installations);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving installations", error: err });
    }
};

module.exports = {
    getAllClientsHandler,
    getClientByIdHandler,
    createClientHandler,
    updateClientHandler,
    deleteClientHandler,
    getClientInstallationsHandler,
};