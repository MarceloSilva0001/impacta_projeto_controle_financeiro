const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
  },
  dateOfBirth: DataTypes.DATE,
  password: DataTypes.STRING,
  subscriptionType: {
    type: DataTypes.STRING,
    defaultValue: 'free',
    allowNull: false
  }
}, {
  tableName: 'Users',
  timestamps: true,
});

module.exports = User;