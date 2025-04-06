'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Altera a coluna "tipo" de ENUM para STRING
    await queryInterface.changeColumn('Lancamentos', 'tipo', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverte a coluna "tipo" para ENUM
    await queryInterface.changeColumn('Lancamentos', 'tipo', {
      type: Sequelize.ENUM('receita', 'despesa'),
      allowNull: false,
    });
  }
};
