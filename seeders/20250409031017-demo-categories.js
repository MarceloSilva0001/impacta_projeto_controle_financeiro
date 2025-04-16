'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categorias', [
      // Despesas
      {
        nome: 'Alimentação',
        tipo: 'despesa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Transporte',
        tipo: 'despesa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Moradia',
        tipo: 'despesa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Educação',
        tipo: 'despesa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Lazer',
        tipo: 'despesa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Saúde',
        tipo: 'despesa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Receitas
      {
        nome: 'Salário',
        tipo: 'receita',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Freelance',
        tipo: 'receita',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Investimentos',
        tipo: 'receita',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Presentes',
        tipo: 'receita',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorias', null, {});
  }
};

