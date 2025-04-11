const User = require('./User');
const Lancamento = require('./Lancamento');
const Categoria = require('./Categoria');

// Relacionamento: 1 usuário tem muitos lançamentos
User.hasMany(Lancamento, { foreignKey: 'userId', as: 'lancamentos' });
Lancamento.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });

// Relacionamento: 1 categoria tem muitos lançamentos
Categoria.hasMany(Lancamento, { foreignKey: 'categoria_id', as: 'lancamentos' });
Lancamento.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

module.exports = { User, Lancamento, Categoria };