'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sequelize = queryInterface.sequelize;
    const transaction = await sequelize.transaction();

    try{


      // Guadalajara
      const alumnosGua = await sequelize.query('SELECT id FROM Alumnos WHERE campusId = 3',
      {
        type: sequelize.QueryTypes.SELECT
      });

      const seccionsEdo = await sequelize.query('SELECT id, periodoId  FROM Seccions WHERE campusId = 3',{
        type: sequelize.QueryTypes.SELECT
      });


      // Alumno 1
      await queryInterface.bulkInsert('Inscripcions',[
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 70,
          alumnoId: alumnosGua[0].id,
          seccionId: seccionsEdo[0].id,
          periodoId: seccionsEdo[0].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 73,
          alumnoId: alumnosGua[0].id,
          seccionId: seccionsEdo[1].id,
          periodoId: seccionsEdo[1].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 75,
          alumnoId: alumnosGua[0].id,
          seccionId: seccionsEdo[2].id,
          periodoId: seccionsEdo[2].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 77,
          alumnoId: alumnosGua[0].id,
          seccionId: seccionsEdo[3].id,
          periodoId: seccionsEdo[3].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 83,
          alumnoId: alumnosGua[0].id,
          seccionId: seccionsEdo[4].id,
          periodoId: seccionsEdo[4].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 88,
          alumnoId: alumnosGua[0].id,
          seccionId: seccionsEdo[5].id,
          periodoId: seccionsEdo[5].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{
        transaction
      });

      // Alumno 2
      await queryInterface.bulkInsert('Inscripcions',[
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 90,
          alumnoId: alumnosGua[1].id,
          seccionId: seccionsEdo[0].id,
          periodoId: seccionsEdo[0].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 88,
          alumnoId: alumnosGua[1].id,
          seccionId: seccionsEdo[1].id,
          periodoId: seccionsEdo[1].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 93,
          alumnoId: alumnosGua[1].id,
          seccionId: seccionsEdo[2].id,
          periodoId: seccionsEdo[2].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'No Aprobado',
          aprobado: false,
          calificacion: 55,
          alumnoId: alumnosGua[1].id,
          seccionId: seccionsEdo[3].id,
          periodoId: seccionsEdo[3].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{
        transaction
      });



      await transaction.commit();
    }catch(e){

      await transaction.rollback();
      console.log(e);
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
