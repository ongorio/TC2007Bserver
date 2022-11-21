'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inscripcion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // one to many on Alumno
      models.Alumno.hasMany(models.Inscripcion)
      models.Inscripcion.belongsTo(models.Alumno)

      // one to many Seccion
      models.Seccion.hasMany(models.Inscripcion)
      models.Inscripcion.belongsTo(models.Seccion)

      // one to one Periodo
      models.Periodo.hasOne(models.Inscripcion)
      models.Inscripcion.belongsTo(models.Periodo)

    }
  }
  Inscripcion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    estatus: DataTypes.STRING,
    aprobado: DataTypes.BOOLEAN,
    calificacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inscripcion',
  });
  return Inscripcion;
};