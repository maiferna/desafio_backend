const sendEmail = require("../utils/sendEmail");

const handleContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            ok: false,
            msg: "Faltan datos obligatorios",
        });
    }

    try {
        await sendEmail({
            to: process.env.EMAIL_USER, // correo del admin
            subject: "Nuevo mensaje de contacto desde la web",
            html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
        });

        return res.status(200).json({
            ok: true,
            msg: "Mensaje enviado correctamente",
        });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error interno al enviar el mensaje",
        });
    }
};

module.exports = {
    handleContactForm,
};