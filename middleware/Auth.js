const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/index');


// Middleware to check if the user is authenticated
async function authenticate(req, res, next){

    // Get token from request if exists
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No token provided!');

    try {
        // Decode token and get user associated to it.
        const decoded = jwt.verify(token, config.get('SECRET_KEY'));
        const user = await User.findByPk(decoded._id);

        // Add user to request object
        req.user = user;
        next();
    }catch(e){

        // If token is invalid return 400 response
        res.status(400).send('Bad Token Provided');

    }
};


// Middleware to check permissions
// perm (str): permission to be looked for
function hasPerm(perm){

    // Handler function, actual middleware
    async function hanlder(req, res, next){
        // If no user is found in request return 401 response
        if (!req.user) return res.status(401).send('No perm');


        // Check if user is Admin
        if (perm == 'isAdmin'){
            if (req.user.isAdmin){
                return next();
            }
        }

        // Check if user is coordinador
        if (perm == 'isCoord'){
            if(req.user.isCoord){
                return next();
            }
        }

        // Check if user is Alumno
        if (perm == 'isAlumno'){
            if (req.user.isAlumno){
                return next();
            }
        }

        // If no permission is found return 403 response
        return res.status(403).send('Permission Denied');
    }
    
    // Returns handler function
    return hanlder
}



module.exports = authenticate;
module.exports.hasPerm = hasPerm;