'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sequelize = queryInterface.sequelize;
    const transaction = await sequelize.transaction();

    const alumno = await sequelize.query('SELECT id FROM Users WHERE isAlumno=true;', {type: sequelize.QueryTypes.SELECT});
    const periodo = await sequelize.query('SELECT id FROM Periodos;', {type: sequelize.QueryTypes.SELECT});
    const seccion = await sequelize.query('SELECT id FROM Seccions;', {type: sequelize.QueryTypes.SELECT});
    try{
      await queryInterface.bulkInsert('Inscripcions', [
        {
          estatus: 'Aprobada',
          aprobado: true,
          alumnoId: alumno[Math.floor(Math.random()*alumno.length)].id,
          periodoId: periodo[Math.floor(Math.random()*periodo.length)].id,
          seccionId: seccion[Math.floor(Math.random()*seccion.length)].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'Reprobada',
          aprobado: false,
          alumnoId: alumno[Math.floor(Math.random()*alumno.length)].id,
          periodoId: periodo[Math.floor(Math.random()*periodo.length)].id,
          seccionId: seccion[Math.floor(Math.random()*seccion.length)].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'Reprobada',
          aprobado: false,
          alumnoId: alumno[Math.floor(Math.random()*alumno.length)].id,
          periodoId: periodo[Math.floor(Math.random()*periodo.length)].id,
          seccionId: seccion[Math.floor(Math.random()*seccion.length)].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    }
    catch(e){
      console.log("Error", e);
      await transaction.rollback();
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Inscripcions', null, {});
  }
};
