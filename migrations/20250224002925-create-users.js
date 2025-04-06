'use strict';

const SequelizeLib = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: SequelizeLib.INTEGER
      },
      name: {
        type: SequelizeLib.STRING
      },
      email: {
        type: SequelizeLib.STRING,
        unique: true
      },
      cpf: {
        type: SequelizeLib.STRING,
        unique: true
      },
      dateOfBirth: {
        type: SequelizeLib.DATE
      },
      password: {
        type: SequelizeLib.STRING
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
    await queryInterface.dropTable('Users');
  }
};
