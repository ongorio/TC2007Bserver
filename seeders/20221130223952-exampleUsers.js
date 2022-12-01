'use strict';


const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    const sequelize = queryInterface.sequelize;
    const transaction = await sequelize.transaction();


    // Generate Example Users

    const salt = await bcrypt.genSalt();
    const pass = await bcrypt.hash('1234', salt);

    try{
      // Coordinador Extra
      await queryInterface.bulkInsert('Users',[

        // Admin
        {
          email: 'a00000@tec.mx',
          first_name: 'Benjamin',
          last_name: 'Galindo',
          password: pass,
          isAdmin: true,
          isCoord: false,
          isAlumno: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Coordinador
        {
          email: 'a01111@tec.mx',
          first_name: 'Jorge',
          last_name: 'Suarez',
          password: pass,
          isAdmin: false,
          isCoord: true,
          isAlumno: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a01112@tec.mx',
          first_name: 'Juana',
          last_name: 'Ines',
          password: pass,
          isAdmin: false,
          isCoord: true,
          isAlumno: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a01113@tec.mx',
          first_name: 'Renata',
          last_name: 'Collier',
          password: pass,
          isAdmin: false,
          isCoord: true,
          isAlumno: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a01114@tec.mx',
          first_name: 'Rigoberto',
          last_name: 'Rpsas',
          password: pass,
          isAdmin: false,
          isCoord: true,
          isAlumno: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Campus Edo Mex
        {
          email: 'a0244111@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a0244112@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a0244113@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Campus Saltillo
        {
          email: 'a0244114@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a0244115@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a0244116@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Campus Guadalajara
        {
          email: 'a0244117@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a0244118@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a0244119@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // Campus Monterrey
        {
          email: 'a0244120@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a0244121@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'a0244122@tec.mx',
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          password: pass,
          isAdmin: false,
          isCoord: false,
          isAlumno: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ],{
        transaction
      });
      
      
      await transaction.commit()


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
