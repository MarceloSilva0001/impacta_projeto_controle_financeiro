'use strict';

const SequelizeLib = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Lancamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: SequelizeLib.INTEGER
      },
      descricao: {
        type: SequelizeLib.STRING,
        allowNull: false
      },
      valor: {
        type: SequelizeLib.FLOAT,
        allowNull: false
      },
      tipo: {
        type: SequelizeLib.STRING, // Aqui foi trocado o ENUM por STRING
        allowNull: false
      },
      data: {
        type: SequelizeLib.DATE,
        allowNull: false
      },
      userId: {
        type: SequelizeLib.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: SequelizeLib.DATE
      },
      updatedAt: {
        allowNull: false,
        type: SequelizeLib.DATE
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Lancamentos');
  }
};
