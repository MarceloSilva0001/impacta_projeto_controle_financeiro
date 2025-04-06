const User = require('./User');
const Lancamento = require('./Lancamento');

// Relacionamento: 1 usuário tem muitos lançamentos
User.hasMany(Lancamento, { foreignKey: 'userId', as: 'lancamentos' });
Lancamento.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });

module.exports = { User, Lancamento };
