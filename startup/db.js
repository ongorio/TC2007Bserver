const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    storage: './prepanet.sqlite',
    dialect: 'sqlite',
});

module.exports = ()=>{
    sequelize.authenticate()
        .then(()=>{
            console.log('Connection to DB succesful!');
        })
        .catch((e)=>{
            console.log('Connection to DB couldn\'t be established!');
            process.abort(1);
        })
};