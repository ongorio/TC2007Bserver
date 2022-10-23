'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const sequelize = queryInterface.sequelize
    const transaction = await sequelize.transaction()
    const matriculas = ["A023939", "A0292939", "A0128383", "A0202994844", "A0238282"];

    try {
      const alumnosId = await sequelize.query('SELECT id FROM Users WHERE isAlumno=true', {type: sequelize.QueryTypes.SELECT});
      const coordsId = await sequelize.query('SELECT id FROM Users WHERE isCoord=true', {type: sequelize.QueryTypes.SELECT});
      
      let alumnos = []
      alumnosId.forEach(alumno=>{
        alumnos.push({
          matricula: matriculas[Math.floor(Math.random()*matriculas.length)],
          birthDate: new Date(1985, 6, 3),
          campusId: 1,
          userId: alumno.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      })
      
      const res = await queryInterface.bulkInsert('Alumnos', alumnos, {transaction});
      console.log(res)
      let coords = [];
      coordsId.forEach(coord =>{
        coords.push({
          userId: coord.id,
          campusId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })
      
      await queryInterface.bulkInsert('Coordinadors', coords, {transaction})

      await transaction.commit();
    } catch(e){
      console.log('Error',e)
      await transaction.rollback();
    }
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Alumnos',null, {})
     await queryInterface.bulkDelete('Coordinadors',null, {})
  }
};
