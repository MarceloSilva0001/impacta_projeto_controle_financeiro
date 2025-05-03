const express = require('express');
const router = express.Router();
const gastosPorCategoriaController = require('../controllers/gastosPorCategoriaController');

// Rota para despesas por categoria
router.get('/gastosporcategoria/despesa/:userId', gastosPorCategoriaController.listarDespesasPorCategoria);

// Rota para receitas por categoria
router.get('/gastosporcategoria/receita/:userId', gastosPorCategoriaController.listarReceitasPorCategoria);

module.exports = router;