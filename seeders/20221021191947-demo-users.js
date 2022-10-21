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
    await queryInterface.bulkInsert('Users', [{
      email: "A00694200@tec.mx",
      password: "123",
      first_name: "Pedro",
      last_name: "Sanchez",
      isAdmin: false,
      isCoord: false,
      isAlumno: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: "A00981243@tec.mx",
      password: "123",
      first_name: "Maria",
      last_name: "Alain",
      isAdmin: true,
      isCoord: false,
      isAlumno: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: "A08324573@tec.mx",
      password: "123",
      first_name: "Kike",
      last_name: "Isais",
      isAdmin: false,
      isCoord: true,
      isAlumno: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
