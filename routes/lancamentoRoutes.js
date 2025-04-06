const express = require('express');
const router = express.Router();
const lancamentoController = require('../controllers/LancamentoController');

// Rota para criar lançamento
router.post('/lancamentos', lancamentoController.createLancamento);
router.get('/lancamentos/:userId', lancamentoController.listarLancamentosPorUsuario);

module.exports = router;
