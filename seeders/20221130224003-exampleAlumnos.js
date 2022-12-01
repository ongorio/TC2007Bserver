'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const sequelize = queryInterface.sequelize;
    const transaction = await sequelize.transaction();
    try{

      
    const coordis = await sequelize.query('SELECT id FROM Users WHERE email="a01111@tec.mx" or email="a01112@tec.mx" or email="a01113@tec.mx" or email="a01114@tec.mx" ',
    {
      type: sequelize.QueryTypes.SELECT
    });

      await queryInterface.bulkInsert('Coordinadors', [
        {
          campusId: 1,
          userId: coordis[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          campusId: 2,
          userId: coordis[1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          campusId: 3,
          userId: coordis[2].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          campusId: 4,
          userId: coordis[3].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ],{
        transaction
      });

      // Estado Mexico
      const usersEdo = await sequelize.query('SELECT id FROM Users WHERE email="a0244111@tec.mx" or email="a0244112@tec.mx" or email="a0244113@tec.mx" ',
      {
        type: sequelize.QueryTypes.SELECT
      });

      console.log(usersEdo)

      await queryInterface.bulkInsert('Alumnos',[
        {
          matricula: 'a0244111',
          campusId: 2,
          userId: usersEdo[0].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          matricula: 'a0244112',
          campusId: 2,
          userId: usersEdo[1].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          matricula: 'a0244113',
          campusId: 2,
          userId: usersEdo[2].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{
        transaction
      });


      // Saltillo
      const usersSalt = await sequelize.query('SELECT id FROM Users WHERE email="a0244114@tec.mx" or email="a0244115@tec.mx" or email="a0244116@tec.mx" ',
      {
        type: sequelize.QueryTypes.SELECT
      });

      console.log(usersSalt);

      await queryInterface.bulkInsert('Alumnos',[
        {
          matricula: 'a0244114',
          campusId: 4,
          userId: usersSalt[0].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          matricula: 'a0244115',
          campusId: 4,
          userId: usersSalt[1].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          matricula: 'a0244116',
          campusId: 4,
          userId: usersSalt[2].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{
        transaction
      });


      // Guadalajara
      const usersGua = await sequelize.query('SELECT id FROM Users WHERE email="a0244117@tec.mx" or email="a0244118@tec.mx" or email="a0244119@tec.mx" ',
      {
        type: sequelize.QueryTypes.SELECT
      });

      console.log(usersGua);

      await queryInterface.bulkInsert('Alumnos',[
        {
          matricula: 'a0244117',
          campusId: 3,
          userId: usersGua[0].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          matricula: 'a0244118',
          campusId: 3,
          userId: usersGua[1].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          matricula: 'a0244119',
          campusId: 3,
          userId: usersGua[2].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{
        transaction
      });


      // Mty
      const usersMty = await sequelize.query('SELECT id FROM Users WHERE email="a0244120@tec.mx" or email="a0244121@tec.mx" or email="a0244122@tec.mx" ',
      {
        type: sequelize.QueryTypes.SELECT
      });

      console.log(usersMty)

      await queryInterface.bulkInsert('Alumnos',[
        {
          matricula: 'a0244120',
          campusId: 1,
          userId: usersMty[0].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          matricula: 'a0244121',
          campusId: 1,
          userId: usersMty[1].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          matricula: 'a0244122',
          campusId: 1,
          userId: usersMty[2].id,
          birthdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],{
        transaction
      });

      await transaction.commit();
    }catch(e){
      console.log(e);
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
