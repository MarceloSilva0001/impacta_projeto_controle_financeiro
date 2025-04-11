const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['receita', 'despesa']]
    }
  }
}, {
  tableName: 'Categorias',
  timestamps: true
});

module.exports = Categoria;