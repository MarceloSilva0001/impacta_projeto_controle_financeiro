const Lancamento = require('../models/lancamento');

const gastosPorCategoria = {
    // Para despesas
    async listarDespesasPorCategoria(req, res) {
        try {
            const { userId } = req.params;
            const { startDate, endDate, currentMonth } = req.query;
            
            let whereClause = { userId, tipo: 'despesa' };
            
            // Filtro por mês vigente
            if (currentMonth === 'true') {
                const now = new Date();
                const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
                const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                
                whereClause.data = {
                    [Op.between]: [firstDay, lastDay]
                };
            }
            // Filtro por datas personalizadas
            else if (startDate && endDate) {
                whereClause.data = {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                };
            }
            
            const lancamentos = await Lancamento.findAll({
                where: whereClause,
                include: ['categoria']
            });

            const resultado = {};

            lancamentos.forEach(lancamento => {
                const categoriaNome = lancamento.categoria.nome;
                if (!resultado[categoriaNome]) {
                    resultado[categoriaNome] = 0;
                }
                resultado[categoriaNome] += lancamento.valor;
            });

            res.json(resultado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Para receitas
    async listarReceitasPorCategoria(req, res) {
        try {
            const { userId } = req.params;
            const { startDate, endDate, currentMonth } = req.query;
            
            let whereClause = { userId, tipo: 'receita' }; 
            
            // Filtro por mês vigente
            if (currentMonth === 'true') {
                const now = new Date();
                const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
                const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                
                whereClause.data = {
                    [Op.between]: [firstDay, lastDay]
                };
            }
            // Filtro por datas personalizadas
            else if (startDate && endDate) {
                whereClause.data = {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                };
            }
            
            const lancamentos = await Lancamento.findAll({
                where: whereClause,
                include: ['categoria']
            });

            const resultado = {};

            lancamentos.forEach(lancamento => {
                const categoriaNome = lancamento.categoria.nome;
                if (!resultado[categoriaNome]) {
                    resultado[categoriaNome] = 0;
                }
                resultado[categoriaNome] += lancamento.valor;
            });

            res.json(resultado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = gastosPorCategoria;