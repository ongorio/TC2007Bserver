'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const sequelize = queryInterface.sequelize;
    const transaction = await sequelize.transaction();

    try{
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
          campusId: 2,
          code: "420690",
          userId: user2[0].id,
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
