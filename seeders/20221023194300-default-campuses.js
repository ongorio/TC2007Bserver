'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Campuses', [
      {
        name: 'Monterrey',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Estado de Mexico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Guadalajara',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Saltillo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Campuses', null, {});
  }
};
