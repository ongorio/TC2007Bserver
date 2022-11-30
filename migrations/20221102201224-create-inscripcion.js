'use strict';

/*
  This file creates the following tables on the database
  - Inscripcions
*/



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inscripcions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estatus: {
        type: Sequelize.STRING
      },
      aprobado: {
        type: Sequelize.BOOLEAN
      },
      calificacion: {
        type: Sequelize.INTEGER
      },
      alumnoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Alumnos',
          key: 'id'
        }
      },
      seccionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Seccions',
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
    await queryInterface.dropTable('Inscripcions');
  }
};