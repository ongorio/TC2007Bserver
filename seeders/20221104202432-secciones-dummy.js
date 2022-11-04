'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   try{
    const sequelize = queryInterface.sequelize;
    const taller = await sequelize.query('SELECT id FROM Tallers;', {type: sequelize.QueryTypes.SELECT});
    const campus = await sequelize.query('SELECT id FROM Campuses;', {type: sequelize.QueryTypes.SELECT});
    const periodo = await sequelize.query('SELECT id FROM Periodos;', {type: sequelize.QueryTypes.SELECT});
      await queryInterface.bulkInsert('Seccions', [
        {
          secNum: Math.floor(Math.random()*20),
          campusId: campus[Math.floor(Math.random()*campus.length)].id,
          tallerId: taller[Math.floor(Math.random()*taller.length)].id,
          isOpen: true,
          periodoId: periodo[Math.floor(Math.random()*periodo.length)].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          secNum: Math.floor(Math.random()*20),
          campusId: campus[Math.floor(Math.random()*campus.length)].id,
          tallerId: taller[Math.floor(Math.random()*taller.length)].id,
          isOpen: false,
          periodoId: periodo[Math.floor(Math.random()*periodo.length)].id,
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
    await queryInterface.bulkDelete('Seccions', null, {});
  }
};
