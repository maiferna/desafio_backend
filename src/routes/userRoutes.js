const express = require("express");
const router = express.Router();

const {
    getUsersController,
    getUserByIdController,
    getUserByEmailController,
    putUserByIdController,
    deleteUserByIdController
} = require("../controllers/userController");

const { validateJwt, validateRole } = require("../middlewares/index.js");

// Middleware: solo accesible para admins
const adminAccess = [validateJwt, validateRole("admin")];

// GET /api/v1/users → obtener todos los usuarios
router.get("/", adminAccess, getUsersController);

// GET /api/v1/users/email/:email → obtener usuario por email
router.get("/email/:email", adminAccess, getUserByEmailController);

// GET /api/v1/users/:id_usuario → obtener usuario por ID
router.get("/:id_usuario", adminAccess, getUserByIdController);

// PUT /api/v1/users/:id_usuario → actualizar usuario por ID
router.put("/:id_usuario", adminAccess, putUserByIdController);

// DELETE /api/v1/users/:id_usuario → eliminar usuario por ID
router.delete("/:id_usuario", adminAccess, deleteUserByIdController);

module.exports = router;
