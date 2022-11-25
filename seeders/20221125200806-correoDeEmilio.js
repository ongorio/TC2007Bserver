'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: "A01540484@tec.mx",
        password: "1234",
        first_name: "Emilio",
        last_name: "Perro",
        isAdmin: false,
        isCoord: false,
        isAlumno: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    const user = await sequelize.query("SELECT id FROM Users WHERE email='A01540484@tec.mx'", {type: sequelize.QueryTypes.SELECT});

    await queryInterface.bulkInsert('Alumnos', [
      {
        matricula: "A01540484",
        birthDate: new Date(1999, 12, 1),
        campusId: 1,
        code: "900100",
        userId: user[0].id,
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
