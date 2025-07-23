const express = require("express");
const { check } = require("express-validator");
const { validateInput } = require("../middlewares");
const { handleContactForm } = require("../controllers/contactController");

const router = express.Router();

router.post(
    "/",
    [
        check("name", "El nombre es obligatorio").notEmpty().isLength({ min: 2, max: 100 }),
        check("email", "Email inválido").notEmpty().isEmail(),
        check("message", "El mensaje no puede estar vacío").notEmpty().isLength({ min: 5 }),
        validateInput
    ],
    handleContactForm
);

module.exports = router;
