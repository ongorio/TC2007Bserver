'use strict';

/*
  This file creates the following tables on the database
  - Seccions
*/


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seccions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      secNum: {
        type: Sequelize.INTEGER
      },
      isOpen: {
        type: Sequelize.BOOLEAN
      },

      campusId :{
        type: Sequelize.INTEGER,
        references: {
          model: 'Campuses',
          key: 'id'
        }
      },

      tallerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tallers',
          key: 'id'
        }
      },

      periodoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Periodos',
          key: 'id'
        }
      },


      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seccions');
  }
};