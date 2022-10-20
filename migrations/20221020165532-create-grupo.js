'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Grupos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clave: {
        type: Sequelize.STRING,
        unique: true
      },
      campusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Campuses',
          key: 'id'
        }
      },
      tallerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Taller',
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
    },{
      uniqueKeys: {
        campus_group: {
          fields: ['tallerId', 'campusId']
        }
      }
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Grupos');
  }
};