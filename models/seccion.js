'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      // one to many on Campus
      models.Campus.hasMany(models.Seccion);
      models.Seccion.belongsTo(models.Campus);

      // one to many on Taller
      models.Taller.hasMany(models.Seccion);
      models.Seccion.belongsTo(models.Taller);

      // one to many on Period
      models.Periodo.hasMany(models.Seccion);
      models.Seccion.belongsTo(models.Periodo);
    }
  }
  Seccion.init({
    secNum: DataTypes.INTEGER,
    isOpen: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Seccion',
  });
  return Seccion;
};