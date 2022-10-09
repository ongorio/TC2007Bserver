// Marcelo Eduardo Guillen Castillo A00831137
// Isaias 
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', {
    logging: console.log,
    host: 'localhost',
    dialect: 'sqlite',
    storage: './database/database.sqlite3'
})

try{
    sequelize.authenticate();
    console.log('La conexión ha sido exitosa');
}
catch(error){
    console.error('Incapaz de conectarse a la base de datos debido a:', error);
}
