const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Lancamento = sequelize.define('Lancamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // ou false se for obrigatório
    references: {
      model: 'Categorias',
      key: 'id'
    }
  }
}, {
  tableName: 'Lancamentos',
  timestamps: true,
});

module.exports = Lancamento;
