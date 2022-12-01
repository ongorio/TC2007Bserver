'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const sequelize = queryInterface.sequelize;
    const transaction = await sequelize.transaction();

    try{
      await queryInterface.bulkInsert('Periodos', [
        {
          nombre: 'Ago-Dic 2019',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombre: 'Feb-Jun 2020',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombre: 'Ago-Dic 2020',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombre: 'Feb-Jun 2021',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombre: 'Ago-Dic 2021',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombre: 'Feb-Jun 2022',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
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
       ],{
        transaction
       });

       await transaction.commit();


    }
    catch(e){
      console.log("Error --> ", e);
      await transaction.rollback();
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Periodos', null, {});
  }
};
