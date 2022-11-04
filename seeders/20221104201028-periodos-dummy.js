'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      await queryInterface.bulkInsert('Periodos', [
        {
          nombre: 'Ago-Dic 2022',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombre: 'Feb-Jun 2023',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombre: 'Feb-Jun 2022',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
       ])
    }
    catch(e){
      console.log("Error --> ", e);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Periodos', null, {});
  }
};
