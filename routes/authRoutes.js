const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();


// Rotas de autenticação login e cadastro de user
router.get("/register", authController.register); // Retorna a página de cadastro de usuario
router.get("/login", authController.login); // Retorna a página de login
router.post("/authLogin", authController.authLogin); // Faz a autentcação no controller de usuario


module.exports = router;