'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grupo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One to Many with taller
      models.Grupo.belongsTo(models.Taller);
      models.Taller.hasMany(models.Grupo);

      // One to Many with Campus
      models.Grupo.belongsTo(models.Campus);
      models.Campus.hasMany(models.Grupo);
    }
  }
  Grupo.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    clave: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Grupo',
  });
  return Grupo;
};