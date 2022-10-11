const { Model, DataTypes } = require('sequelize');

class Alumno extends Model {}



module.exports.init = sequelize =>{
    Alumno.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        matricula: DataTypes.STRING,
        birthdate: DataTypes.DATEONLY
        // FK with user one to one
        // FK with Campus one(campus) to many(alumnos)

    },{
        sequelize
    })
};
module.exports.Alumno = Alumno;
