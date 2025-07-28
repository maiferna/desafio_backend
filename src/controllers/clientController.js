const {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    getClientInstallations,
} = require("../models/clientModel");

/**
 * Recive todos los clientes
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getAllClientsHandler = async (req, res) => {
    try {
        const clients = await getAllClients();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving clients", error: err });
    }
};

/**
 * Recive el cliente por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getClientByIdHandler = async (req, res) => {
    try {
        const client = await getClientById(req.params.id);
        if (!client) return res.status(404).json({ message: "Client not found" });
        return res.json(client);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving client", error: err });
    }
};

/**
 * Crear un nuevo cliente
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const createClientHandler = async (req, res) => {
    const { name, email, tel, adress, workType } = req.body;
    try {
        const newClient = await createClient({
            nombre: name,
            email,
            tel,
            direccion: adress,
            sector: workType
        });
        res.status(201).json(newClient);
    } catch (err) {
        res.status(500).json({ message: "Error creating client", error: err });
    }
};

/**
 * Actualiza a un cliente
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const updateClientHandler = async (req, res) => {
    const { name, email, tel, adress, workType } = req.body;
    const id = req.params.id;
    try {
        const updatedClient = await updateClient(id, {
            nombre: name,
            email,
            tel,
            direccion: adress,
            sector: workType
        });
        if (!updatedClient) return res.status(404).json({ message: "Client not found" });
        res.json(updatedClient);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error updating client", error: err });
    }
};

/**
 * Elimina a un cliente
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const deleteClientHandler = async (req, res) => {
    try {
        const deleted = await deleteClient(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Client not found" });
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ message: "Error deleting client", error: err });
    }
};

/**
 * Recive las instalaciones de un usuario
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
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