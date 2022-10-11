const { Model, DataTypes } = require('sequelize');

class User extends Model {}


module.exports.init = sequelize=>{
    User.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
        isCoord: DataTypes.BOOLEAN,
        isAlumno: DataTypes.BOOLEAN,
    },{
        sequelize
    })

};
module.exports.User = User;