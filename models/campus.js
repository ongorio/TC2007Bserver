const { Model, DataTypes } = require('sequelize');

class Campus extends Model {}



module.exports.init = sequelize=>{
    Campus.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    },{
        sequelize
    })
};
module.exports.Campus = Campus;


