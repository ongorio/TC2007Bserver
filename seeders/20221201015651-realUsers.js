'use strict';

const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const sequelize = queryInterface.sequelize;
    const transaction = await sequelize.transaction();

    const salt = await bcrypt.genSalt();
    const pass = await bcrypt.hash('1234', salt);
    try{

      await queryInterface.bulkInsert('Users', [
        {
          email: "A01540484@tec.mx",
          password: pass,
          first_name: "Emilio",
          last_name: "da Silva",
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          email: "A00831137@tec.mx",
          password: pass,
          first_name: "Marcelo",
          last_name: "de Jesus",
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],{
        transaction
      });
  
      await transaction.commit();
    }catch(e){
      await transaction.rollback();
    }

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
