'use strict';

const bcrypt = require('bcrypt');
const { sequelize } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const salt = await bcrypt.genSalt();
    const pass1 = await bcrypt.hash('1234', salt);
    const pass2 = await bcrypt.hash('XD', salt)

    queryInterface.bulkInsert('Users', [
      {
        email: "A01540484@tec.mx",
        password: pass1,
        first_name: "Emilio",
        last_name: "Perro",
        isAdmin: false,
        isCoord: false,
        isAlumno: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        email: "A00831137@tec.mx",
        password: pass2,
        first_name: "Marcelo",
        last_name: "Todopoderoso",
        isAdmin: false,
        isCoord: false,
        isAlumno: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Alumnos', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
