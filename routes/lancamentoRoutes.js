const express = require('express');
const router = express.Router();
const lancamentoController = require('../controllers/LancamentoController');

// Criar novo lançamento
router.post('/lancamentos', lancamentoController.createLancamento);

// Listar lançamentos com filtros (ano, mês, tipo, categoria, userId)
router.get('/lancamentos', lancamentoController.filtrarLancamentos);

// Listar todos os lançamentos de um usuário (sem filtros)
router.get('/lancamentos/:userId', lancamentoController.listarLancamentosPorUsuario);

module.exports = router;
