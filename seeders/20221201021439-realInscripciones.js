'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sequelize = queryInterface.sequelize;
    const transaction = await sequelize.transaction();

    try{
      const user1 = await sequelize.query('SELECT id FROM Alumnos WHERE matricula="A01540484"', {type: sequelize.QueryTypes.SELECT});
      const user2 = await sequelize.query('SELECT id FROM Alumnos WHERE matricula="A00831137"', {type: sequelize.QueryTypes.SELECT});

      console.log(user1);
      const seccionsMty = await sequelize.query('SELECT id, periodoId  FROM Seccions WHERE campusId = 1',{
        type: sequelize.QueryTypes.SELECT
      });
      const seccionsEdo = await sequelize.query('SELECT id, periodoId  FROM Seccions WHERE campusId = 2',{
        type: sequelize.QueryTypes.SELECT
      });

      await queryInterface.bulkInsert('Inscripcions',[
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 90,
          alumnoId: user1[0].id,
          seccionId: seccionsMty[0].id,
          periodoId: seccionsMty[0].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 97,
          alumnoId: user1[0].id,
          seccionId: seccionsMty[1].id,
          periodoId: seccionsMty[1].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 85,
          alumnoId: user1[0].id,
          seccionId: seccionsMty[2].id,
          periodoId: seccionsMty[2].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{
        transaction
      });

      await queryInterface.bulkInsert('Inscripcions',[
        {
          estatus: 'Aprobado',
          aprobado: true,
          calificacion: 90,
          alumnoId: user2[0].id,
          seccionId: seccionsEdo[0].id,
          periodoId: seccionsEdo[0].periodoId,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          estatus: 'No Aprobado',
          aprobado: false,
          calificacion: 53,
          alumnoId: user2[0].id,
          seccionId: seccionsEdo[1].id,
          periodoId: seccionsEdo[1].periodoId,
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
