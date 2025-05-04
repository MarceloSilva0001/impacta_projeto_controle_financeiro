const  Categoria  = require('../models/Categoria');
const path = require('path');


// Listar todas as categorias
const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      order: [['tipo', 'DESC'], ['nome', 'ASC']] // Ordena por tipo (receita primeiro) e depois por nome
    });
    res.json(categorias);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ erro: 'Erro ao listar categorias' });
  }
};

// Criar nova categoria
const criarCategoria = async (req, res) => {
  try {
    const { nome, tipo } = req.body;
    
    // Validação simples
    if (!nome || !tipo) {
      return res.status(400).json({ erro: 'Nome e tipo são obrigatórios' });
    }
    
    if (!['receita', 'despesa'].includes(tipo)) {
      return res.status(400).json({ erro: 'Tipo deve ser "receita" ou "despesa"' });
    }

    const novaCategoria = await Categoria.create({ nome, tipo });
    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ erro: 'Erro ao criar categoria' });
  }
};

// Atualizar categoria
const atualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, tipo } = req.body;
    
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }
    
    // Validação
    if (tipo && !['receita', 'despesa'].includes(tipo)) {
      return res.status(400).json({ erro: 'Tipo deve ser "receita" ou "despesa"' });
    }

    await categoria.update({ nome, tipo });
    res.json(categoria);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ erro: 'Erro ao atualizar categoria' });
  }
};

// Excluir categoria
const excluirCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    await categoria.destroy();
    res.status(204).end(); // Resposta sem conteúdo para sucesso
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    res.status(500).json({ erro: 'Erro ao excluir categoria' });
  }
};

// View categories
const categories = async (req, res) => {
  res.status(201).sendFile(path.join(__dirname, '../public/categoria.html'));
}

// Dashboard
const dashboard = async (req, res) => {
  res.status(201).sendFile(path.join(__dirname, '../public/dashboard.html'));
}

module.exports = {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  excluirCategoria,
  dashboard,
  categories
};