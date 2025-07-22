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

// Middleware común solo para admins
const adminAccess = [validateJwt, validateRole("admin")];


// GET /api/v1/users  obtener todos los usuarios
router.get("/", [
    adminAccess
], getUsersController);


// GET /api/v1/users/email/:email  obtener usuario por email
router.get("/email/:email", [
    ...adminAccess,
    check("email", "Email inválido").notEmpty()
        .withMessage('El email no puede estar vacío')
        .isLength({ min: 3, max: 100 })
        .withMessage('Debe tener entre 3 y 100 caracteres')
        .isEmail()
        .withMessage('El formato del email no es correcto'),
    validateInput

], getUserByEmailController);


// GET /api/v1/users/:id_usuario → obtener usuario por ID
router.get("/:id_usuario", [
    ...adminAccess,
    check("id_usuario", "ID inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput

], getUserByIdController);


// PUT /api/v1/users/:id_usuario  actualizar usuario por ID
router.put("/:id_usuario", [
    // ...adminAccess,
    // check("id_usuario", "ID inválido").notEmpty()
    //     .isInt({ min: 1 })
    //     .withMessage('La id debe ser un numero entero como minimo 1'),
    // check("name", "Nombre requerido y debe ser una cadena").optional().isString().isLength({ min: 3, max: 100 }),
    // check("email", "Email inválido").optional().isEmail(),
    // check("password", "La contraseña debe tener mínimo 6 caracteres, una mayúscula y un número")
    //     .optional()
    //     .isStrongPassword({
    //         minLength: 6,
    //         minUppercase: 1,
    //         minNumbers: 1,
    //         minSymbols: 0
    //     }),
    // check("role", "El rol debe ser admin, tecnico o cliente").optional().isIn(["admin", "tecnico", "cliente"]),

    // // Validación cruzada personalizada
    // check("id_cliente").custom((id_cliente, { req }) => {
    //     if (req.body.role === "cliente") {
    //         if (!id_cliente) {
    //             throw new Error("id_cliente es obligatorio si el rol es cliente");
    //         }
    //         if (!Number.isInteger(id_cliente) || id_cliente <= 0) {
    //             throw new Error("id_cliente debe ser un número entero positivo");
    //         }
    //     }
    //     return true;
    // }),

    // validateInput
], putUserByIdController);


// DELETE /api/v1/users/:id_usuario  eliminar usuario por ID
router.delete("/:id_usuario", [
    ...adminAccess,
    check("id_usuario", "ID inválido").notEmpty()
        .isInt({ min: 1 })
        .withMessage('La id debe ser un numero entero como minimo 1'),
    validateInput
], deleteUserByIdController);

module.exports = router;
