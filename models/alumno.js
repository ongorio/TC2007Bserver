'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alumno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasOne(models.Alumno);
      models.Alumno.belongsTo(models.User);
      
      models.Campus.hasMany(models.Alumno);
      models.Alumno.belongsTo(models.Campus)
    }
  }
  Alumno.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    matricula: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    code: DataTypes.STRING,
    expiration: DataTypes.DATE
    // FK with user one to one
    // FK with Campus one(campus) to many(alumnos)
  }, {
    sequelize,
    modelName: 'Alumno',
  });
  return Alumno;
};