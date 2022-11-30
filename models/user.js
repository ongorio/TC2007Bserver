'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Validates password against user hash
    // returns bool
    async validate_password(password){
      const result = await bcrypt.compare(password, this.getDataValue("password"));
      return result;
    }

    // Generates token with the user id encoded
    // returns str
    generateToken(){
      const token = jwt.sign({_id: this.getDataValue('id')}, config.get('SECRET_KEY'));
      return token;
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: {
      type: DataTypes.TEXT,
      set(value){
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(value, salt);

        this.setDataValue("password", hash);
      }
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isCoord:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isAlumno:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};