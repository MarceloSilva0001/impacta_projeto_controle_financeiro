const Lancamento = require('../models/Lancamento');

async function createLancamento(req, res) {
  try {
    const { descricao, valor, tipo, data, userId } = req.body;

    if (!descricao || !valor || !tipo || !data || !userId) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const novoLancamento = await Lancamento.create({
      descricao,
      valor,
      tipo,
      data,
      userId,
    });

    res.status(201).json(novoLancamento);
  } catch (error) {
    console.error('Erro ao salvar lançamento:', error);
    res.status(500).json({ erro: 'Erro ao salvar lançamento.' });
  }
}

async function listarLancamentosPorUsuario(req, res) {
  try {
    const { userId } = req.params;

    const lancamentos = await Lancamento.findAll({
      where: { userId },
    });

    res.status(200).json(lancamentos);
  } catch (error) {
    console.error('Erro ao buscar lançamentos:', error);
    res.status(500).json({ erro: 'Erro ao buscar lançamentos.' });
  }
}

module.exports = {
  createLancamento,
  listarLancamentosPorUsuario,
};
