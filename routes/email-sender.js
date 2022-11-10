const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('config');
const CodeGenerator = require('node-code-generator');

router.post("/code-section/", (req, res) => {    
    try{
        let generator = new CodeGenerator();
        let code = generator.generateCodes('######', 1, {});
        if(!config.get('PASSWORD')){
            console.log('For some reason, the password is not there...');
            process.exit(1);
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
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
            to: "A00831137@tec.mx",     // Aqui se ingresa solo el email del usuario que se selecciono
            subject: "Clave de acceso a la plataforma de prepanet de doble autenticación",
            html: `<b>Su codigo de verificacion es ${code[0]}</b>`,
        };
        
        transporter.sendMail(mailOptions);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;