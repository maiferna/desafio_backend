const {
    getAllInstallations,
    getInstallationById,
    getInstallationsByClientId,
    createInstallation,
    updateInstallation,
    deleteInstallation,
} = require('../models/installationModel');

/**
 * Recive todas las instalaciones
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getAllInstallationsController = async (req, res) => {
    const data = await getAllInstallations();
    res.json(data);
};

/**
 * Recive una instalacion por id
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
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

/**
 * Recive todas las instalaciones por cliente
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
const getInstallationsByClientController = async (req, res) => {
    const data = await getInstallationsByClientId(req.params.clientId);
    res.json(data);
};

/**
 * Crea una nueva instalaciones
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
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

/**
 * Actualiza una instalacion
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
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

/**
 * Elimina una instalacion
 * @param {object} req Objeto con los datos entrantes
 * @param {object} res Objeto con los datos salientes
 * @returns Devueve un objeto: Si sale bien, un ok: true, mensaje, datos devueltos pos la base de datos.
 * Si sale mal, un ok: false y un mensaje
 */
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
