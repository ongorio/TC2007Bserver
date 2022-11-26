const jwt = require('jsonwebtoken');
const config = require('config');
const { User, Alumno } = require('../models/index');

async function authenticate(req, res, next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No token provided!');

    try {
        const decoded = jwt.verify(token, config.get('SECRET_KEY'));
        const user = await User.findByPk(decoded._id);
        req.user = user;
        next();
    }catch(e){
        res.status(400).send('Bad Token Provided');

    }
};

function hasPerm(perm){
    async function hanlder(req, res, next){
        if (!req.user) return res.status(401).send('No perm');
        // console.log(req.user)

        if (perm == 'isAdmin'){
            
            if (req.user.isAdmin){
                next();
            }
        }

        if (perm == 'isCoord'){
            if(req.user.isCoord){
                next();
            }
        }

        if (perm == 'isAlumno'){
            if (req.user.isAlumno){
                next();
            }
        }

        return res.status(403).send('Permission Denied');
    }
    return hanlder
}



module.exports = authenticate;
module.exports.hasPerm = hasPerm;