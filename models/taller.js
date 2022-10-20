'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Taller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Taller.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.TEXT,
    duracion: DataTypes.INTEGER,
    orden: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Taller',
  });
  return Taller;
};