'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  const transaction = await queryInterface.sequelize.transaction();

  try{

    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      isAdmin:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isCoord:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isAlumno:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
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

    await queryInterface.createTable('Campuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.createTable('Alumnos',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matricula: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
      },

      campusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Campuses',
          key: 'id'
        },
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

    queryInterface.createTable('Coordinadors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
      },
      campusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Campuses',
          key: 'id'
        },
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

    await transaction.commit();
  } catch(e){
    await transaction.rollback();
    throw e;
  }
  },

  async down (queryInterface, Sequelize) {
    const transaction = queryInterface.sequelize.transaction();
    
    try {

      await queryInterface.dropTable('Users')
      await queryInterface.dropTable('Campuses')
      await queryInterface.dropTable('Alumnos')
      await queryInterface.dropTable('Coordinadors')
      await transaction.commit();
    }catch(e){
      await transaction.rollback();
      throw e;
    }
    
  }
};
