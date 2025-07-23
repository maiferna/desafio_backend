const express = require("express");
const router = express.Router();
const {
    getUsersController,
    getUserByIdController,
    getUserByEmailController,
    putUserByIdController,
    deleteUserByIdController
} = require("../controllers/userController.js");


const { validateJwt, validateRole, validateInput } = require("../middlewares/index.js");
const { check } = require("express-validator");




// GET /api/v1/users  obtener todos los usuarios
router.get("/", [
    validateJwt,
    validateRole("admin"),
], getUsersController);


// GET /api/v1/users/email/:email  obtener usuario por email
router.get("/email/:email", [
    validateJwt,
    validateRole("admin"),
    check("email", "Email inválido").notEmpty()
        .isLength({ min: 2, max: 100 })
        .withMessage('El email debe tener entre 2 y 100 caracteres')
        .isEmail()
        .withMessage('El formato del email no es correcto'),
    validateInput
], getUserByEmailController);


// GET /api/v1/users/:id_usuario → obtener usuario por ID
router.get("/:id_usuario", [
    validateJwt,
    validateRole("admin"),
    check("id_usuario", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], getUserByIdController);


// PUT /api/v1/users/:id_usuario  actualizar usuario por ID
router.put("/:id_usuario", [
    validateJwt,
    validateRole("admin"),
    check("id_usuario", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    check("name", "Nombre requerido y debe ser una cadena").optional()
        .isString().isLength({ min: 3, max: 100 })
        .withMessage('El name debe tener entre 3 y 100 caracteres'),
    check("email", "Email inválido").optional()
        .isEmail().withMessage('El formato del email no es correcto'),
    check("password", "Password inválido")
        .optional()
        .isStrongPassword({
            minLength: 8,
            maxLength: 50,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0
        })
        .withMessage('La contraseña entre 8 y 50 caracteres, una mayúscula y un número'),
    check("role", "Rol inválido").optional().isIn(["admin", "tecnico", "cliente"])
        .withMessage('El rol debe ser admin, tecnico o cliente'),
    // // Validación cruzada personalizada
    check("id_cliente").custom((id_cliente, { req }) => {
        if (req.body.role === "cliente") {
            if (!id_cliente) {
                throw new Error("id_cliente es obligatorio si el rol es cliente");
            }
            if (!Number.isInteger(id_cliente) || id_cliente <= 0) {
                throw new Error("id_cliente debe ser un número entero positivo");
            }
        }
        return true;
    }),
    validateInput
], putUserByIdController);


// DELETE /api/v1/users/:id_usuario  eliminar usuario por ID
router.delete("/:id_usuario", [
    validateJwt,
    validateRole("admin"),
    check("id_usuario", "ID inválido").notEmpty()
        .isInt({ min: 1, max: 50 })
        .withMessage('La id debe ser un numero entero entre 1 y 50'),
    validateInput
], deleteUserByIdController);

module.exports = router;
