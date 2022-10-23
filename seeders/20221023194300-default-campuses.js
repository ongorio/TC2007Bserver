'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Campuses', null, {});
  }
};
