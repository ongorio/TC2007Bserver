const config = require('config');

module.exports = ()=>{
    // Check if secret Key Present
    if (!config.get('SECRET_KEY')){
        console.log('No Secret Key defined!');
        process.exit(1);
    }

    if(!config.get('PASSWORD')){
        console.log('For some reason, the password is not there...');
        process.exit(1);
    }
};