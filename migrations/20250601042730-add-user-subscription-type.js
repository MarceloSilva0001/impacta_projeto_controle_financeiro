'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'subscriptionType', {
      type: Sequelize.STRING,
      defaultValue: 'free',
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'subscriptionType');
  }
};