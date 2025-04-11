const { Op } = require('sequelize');
const Lancamento = require('../models/Lancamento');
const Categoria = require('../models/Categoria');

// Criação de um novo lançamento
async function createLancamento(req, res) {
  try {
    const { descricao, valor, tipo, data, userId, categoria } = req.body;
    console.log(req.body)

    if (!descricao || !valor || !tipo || !data || !userId) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const novoLancamento = await Lancamento.create({
      descricao,
      valor,
      tipo,
      data,
      userId,
      categoria_id: categoria
    });

    res.status(201).json(novoLancamento);
  } catch (error) {
    console.error('Erro ao salvar lançamento:', error);
    res.status(500).json({ erro: 'Erro ao salvar lançamento.' });
  }
}

// Listar todos os lançamentos de um usuário
async function listarLancamentosPorUsuario(req, res) {
  try {
    const { userId } = req.params;

    const lancamentos = await Lancamento.findAll({
      where: { userId },
      include: [{
        model: Categoria, 
        as: 'categoria', 
        attributes: ['id', 'nome', 'tipo'] 
      }]
    });

    res.status(200).json(lancamentos);
  } catch (error) {
    console.error('Erro ao buscar lançamentos:', error);
    res.status(500).json({ erro: 'Erro ao buscar lançamentos.' });
  }
}

// Novo: Filtro por ano, mês, tipo e categoria
async function filtrarLancamentos(req, res) {
  try {
    const { ano, mes, tipo, categoria, userId } = req.query;

    if (!userId) {
      return res.status(400).json({ erro: 'userId é obrigatório.' });
    }

    const where = { userId };

    if (tipo) where.tipo = tipo;
    if (categoria) where.categoria = categoria;

    // Filtro por ano e mês (se ambos estiverem presentes)
    if (ano && mes) {
      const inicio = new Date(`${ano}-${mes}-01`);
      const fim = new Date(`${ano}-${mes}-31`);
      where.data = { [Op.between]: [inicio, fim] };
    }
    // Filtro apenas por ano
    else if (ano) {
      const inicio = new Date(`${ano}-01-01`);
      const fim = new Date(`${ano}-12-31`);
      where.data = { [Op.between]: [inicio, fim] };
    }

    const lancamentos = await Lancamento.findAll({ where });

    res.status(200).json(lancamentos);
  } catch (error) {
    console.error('Erro ao filtrar lançamentos:', error);
    res.status(500).json({ erro: 'Erro ao filtrar lançamentos.' });
  }
}

module.exports = {
  createLancamento,
  listarLancamentosPorUsuario,
  filtrarLancamentos
};
