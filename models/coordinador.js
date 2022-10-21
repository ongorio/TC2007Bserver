'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Coordinador extends Model{
        /*
        Associations 
        */ 
       static associate(models){
        models.User.hasOne(models.Coordinador);
        models.Coordinador.belongsTo(models.User);

        models.Campus.hasMany(models.Coordinador);
        models.Coordinador.belongsTo(models.Campus);
       }
    }
    Coordinador.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        sequelize,
        modelName: 'Coordinador',
        tableName: 'Coordinadores'
    });
    return Coordinador;
};