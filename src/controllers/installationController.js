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
    const data = await getInstallationById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Installation not found' });
    res.json(data);
};

const getInstallationsByClientController = async (req, res) => {
    const data = await getInstallationsByClientId(req.params.clientId);
    res.json(data);
};

const createInstallationController = async (req, res) => {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);
    const { id, adress, name, latitude, longitude, checkpoints } = req.body;
    const image = req.file.filename;

    try {
        const newInstallation = await createInstallation({
            id_cliente: id,
            direccion: adress,
            nombre: name,
            latitud: latitude,
            longitud: longitude,
            puntos_control: checkpoints,
            image
        });
        console.log('DATA INSTALACION', newInstallation)
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
        console.log('DATA PARA EL EDIT', updated)
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
