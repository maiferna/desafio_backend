const {
    getAllInstallations,
    getInstallationById,
    getInstallationsByClientId,
    createInstallation,
    updateInstallation,
    deleteInstallation,
} = require('../models/installationModel');

const getAllInstallationsController = async (req, res) => {
    const data = await getAllInstallations();
    res.json(data);
};

const getInstallationByIdController = async (req, res) => {
    try {
        const data = await getInstallationById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Installation not found' });
        console.log(data)
        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Contacte con el administrador"
        });
    }

};

const getInstallationsByClientController = async (req, res) => {
    const data = await getInstallationsByClientId(req.params.clientId);
    res.json(data);
};

const createInstallationController = async (req, res) => {

    const { id, adress, name, latitude, longitude, checkpoints, locality } = req.body;
    const image = req.file.filename;

    try {
        const newInstallation = await createInstallation({
            id_cliente: id,
            direccion: adress,
            nombre: name,
            latitud: latitude,
            longitud: longitude,
            localidad: locality,
            puntos_control: checkpoints,
            image
        });
        return res.status(201).json({
            ok: true,
            newInstallation
        });
    } catch (error) {
        console.log('Error al crear la instalación', error);
        return res.status(500).json({
            ok: false,
            msg: "Contacte con el administrador"
        });
    }
};

const updateInstallationController = async (req, res) => {
    const { adress, name, locality, checkpoints, imageUrl } = req.body;
    let image;
    if (req.file) {
        image = req.file.filename;
    } else {
        image = imageUrl;
    }
    const id = req.params.id;
    try {
        const updated = await updateInstallation(id, {
            id_cliente: id,
            direccion: adress,
            nombre: name,
            localidad: locality,
            puntos_control: checkpoints,
            image,
        });
        if (!updated) return res.status(404).json({ message: 'Installation not found' });
        return res.status(200).json({
            ok: true,
            updated
        });
    } catch (error) {
        console.log('Error al actualizar la instalación', error);
        return res.status(500).json({
            ok: false,
            msg: "Contacte con el administrador"
        });
    }
};

const deleteInstallationController = async (req, res) => {
    const deleted = await deleteInstallation(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Installation not found' });
    res.json(deleted);
};

module.exports = {
    getAllInstallationsController,
    getInstallationByIdController,
    getInstallationsByClientController,
    createInstallationController,
    updateInstallationController,
    deleteInstallationController,
};
