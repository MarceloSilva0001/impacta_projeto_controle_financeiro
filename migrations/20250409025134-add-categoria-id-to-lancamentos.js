'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Lancamentos', 'categoria_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Categorias',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    
    await queryInterface.addIndex('Lancamentos', ['categoria_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Lancamentos', 'categoria_id');
  }
};