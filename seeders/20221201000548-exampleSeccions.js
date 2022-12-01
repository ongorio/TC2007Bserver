'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const sequelize = queryInterface.sequelize;
    const transaction = await sequelize.transaction();
    
    
    try{
      
      // Edo Mex
      await queryInterface.bulkInsert('Seccions', [
        {
          tallerId: 1,
          campusId: 2,
          periodoId: 1,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 2,
          campusId: 2,
          periodoId: 2,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 3,
          campusId: 2,
          periodoId: 3,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 4,
          campusId: 2,
          periodoId: 4,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 5,
          campusId: 2,
          periodoId: 5,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 6,
          campusId: 2,
          periodoId: 6,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{
        transaction
      });


      // Monterrey
      await queryInterface.bulkInsert('Seccions', [
        {
          tallerId: 1,
          campusId: 1,
          periodoId: 1,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 2,
          campusId: 1,
          periodoId: 2,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 3,
          campusId: 1,
          periodoId: 3,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 4,
          campusId: 1,
          periodoId: 4,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 5,
          campusId: 1,
          periodoId: 5,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 6,
          campusId: 1,
          periodoId: 6,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{
        transaction
      });


      // Saltillo
      await queryInterface.bulkInsert('Seccions', [
        {
          tallerId: 1,
          campusId: 4,
          periodoId: 1,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 2,
          campusId: 4,
          periodoId: 2,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 3,
          campusId: 4,
          periodoId: 3,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 4,
          campusId: 4,
          periodoId: 4,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 5,
          campusId: 4,
          periodoId: 5,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 6,
          campusId: 4,
          periodoId: 6,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{
        transaction
      });


      // Guadalajara
      await queryInterface.bulkInsert('Seccions', [
        {
          tallerId: 1,
          campusId: 3,
          periodoId: 1,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 2,
          campusId: 3,
          periodoId: 2,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 3,
          campusId: 3,
          periodoId: 3,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 4,
          campusId: 3,
          periodoId: 4,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 5,
          campusId: 3,
          periodoId: 5,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          tallerId: 6,
          campusId: 3,
          periodoId: 6,
          secNum: 1,
          isOpen: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{
        transaction
      });

      await transaction.commit();
    }catch(e){
      console.log('Error ->', e);
      await transaction.rollback();
    }



  },

  async down (queryInterface, Sequelize) {


  }
};
