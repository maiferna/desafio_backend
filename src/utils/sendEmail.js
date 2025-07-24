const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,      // correo que envía
        pass: process.env.EMAIL_PASSWORD,  // contraseña o app password
    },
});

// Función que envía un correo
const sendEmail = async ({ to, subject, text, html }) => {
    const mailOptions = {
        from: `"Contacto desde web" <${process.env.EMAIL_USER}>`,
        to,          // destino (por ejemplo, admin)
        subject,     // asunto
        text,        // texto plano (opcional)
        html,        // html (si lo usas en el frontend)
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;