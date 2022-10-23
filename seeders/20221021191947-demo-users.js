'use strict';
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
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
   const sequelize = queryInterface.sequelize

    const salt = await bcrypt.genSalt();
    const defaultPass = await bcrypt.hash('1234', salt);
    const transaction =  await sequelize.transaction();

    let alumnos = [];
    for (let i = 0; i < 5; i++){
      let fname = faker.name.firstName();
      let lname = faker.name.lastName();
      let temp = {
        email: faker.internet.email(fname, lname, 'tec.mx'),
        password: defaultPass,
        first_name: fname,
        last_name: lname,
        isAlumno: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      alumnos.push(temp);
    }


    try{
      await queryInterface.bulkInsert('Users', [
        ...alumnos,
      {
        email: "A00981243@tec.mx",
        password: defaultPass,
        first_name: "Maria",
        last_name: "Alain",
        isAdmin: true,
        isCoord: false,
        isAlumno: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        email: "A08324573@tec.mx",
        password: defaultPass,
        first_name: "Kike",
        last_name: "Isais",
        isAdmin: false,
        isCoord: true,
        isAlumno: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {
        transaction
      });      
      
      await transaction.commit();
    } catch(e){
      await transaction.rollback();
      console.log(e.sql);
      throw e
    }
    
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users',null, {})

  }
};
