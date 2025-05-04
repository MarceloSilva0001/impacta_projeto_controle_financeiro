const express = require('express');
const router = express.Router();
const {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  excluirCategoria,
  dashboard,
  categories

} = require('../controllers/CategoriaController');

// GET dashboard
router.get('/dashboard', dashboard);

// GET cattegories view
router.get('/categorias', categories);

// GET /categorias → listar categorias
router.get('/categorias', listarCategorias);

// POST /categorias → criar categoria
router.post('/categorias', criarCategoria);

// PUT /categorias/:id → editar categoria
router.put('/categorias/:id', atualizarCategoria);

// DELETE /categorias/:id → excluir categoria
router.delete('/categorias/:id', excluirCategoria);

module.exports = router;