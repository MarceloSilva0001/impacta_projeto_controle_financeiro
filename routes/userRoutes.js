const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Rotas API para usuários
router.post('/users', UserController.createUser); // Criar usuário
router.get('/users', UserController.getUsers); // Buscar todos os usuários
router.get('/users/:id', UserController.getUserById); // Buscar usuário por ID
router.put('/users/:id', UserController.updateUser); // Atualizar usuário
router.delete('/users/:id', UserController.deleteUser); // Deletar usuário

// Rotas do site

module.exports = router;