'use strict';
const bcrypt = require('bcrypt');
const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt();
    await queryInterface.bulkInsert('Users', [
      {
        email: "A01540484@tec.mx",
        password: await bcrypt.hash('1234', salt),
        first_name: "Emilio",
        last_name: "Perro",
        isAdmin: false,
        isCoord: false,
        isAlumno: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        email: "A00831137@tec.mx",
        password: await bcrypt.hash('XD', salt),
        first_name: "Marcelo",
        last_name: "Todopoderoso",
        isAdmin: false,
        isCoord: false,
        isAlumno: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    const user1 = await sequelize.query('SELECT id FROM Users WHERE email="A01540484@tec.mx"', {type: sequelize.QueryTypes.SELECT});
    const user2 = await sequelize.query('SELECT id FROM Users WHERE email="A00831137@tec.mx"', {type: sequelize.QueryTypes.SELECT});

    await queryInterface.bulkInsert('Alumnos', [
      {
        matricula: "A01540484",
        birthDate: new Date(1999, 12, 1),
        campusId: 1,
        code: "900100",
        userId: user1[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        matricula: "A00831137",
        birthDate: new Date(2002, 2, 24),
        campusId: 1,
        code: "420690",
        userId: user2[0].id,
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
