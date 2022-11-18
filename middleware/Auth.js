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

async function send_code(req, res){
    try{
        let generator = new CodeGenerator();
        let code = generator.generateCodes('######', 1, {});
        alumno.code = code[0];
        oldDate = new Date();
        alumno.expiration = new Date(oldDate.getTime() + 300000);
        if(!config.get('PASSWORD')){
            console.log('For some reason, the password is not there...');
            process.exit(1);
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            tls:{
                ciphers:'SSLv3',
            },
            auth:{
                user: 'prepanet-oficial@hotmail.com',
                pass: config.get('PASSWORD'),
            }
        });
        const mailOptions = {
            from: "prepanet-oficial@hotmail.com",
            to: `${req.user.email}`,     // Aqui se ingresa solo el email del usuario que se selecciono
            subject: "Clave de acceso a la plataforma de prepanet de doble autenticación",
            html: `<b>Su codigo de verificacion es ${alumno.code}</b>`,
        };
        
        transporter.sendMail(mailOptions);
    }catch(err){
        res.status(404).send('There was problems in obtaining the code and sending eat');
    }
}

module.exports = send_code;
module.exports = authenticate;
module.exports.hasPerm = hasPerm;