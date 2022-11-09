const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const CodeGenerator = require('node-code-generator');

router.post("/code-section/", (req, res) => {

    
    try{
        let generator = new CodeGenerator();
        let code = generator.generateCodes('######', 1, {});

        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            tls:{
                ciphers:'SSLv3',
            },
            auth:{
                user: 'prepanet-oficial@hotmail.com',
                pass:'0oprt&%Fg$',
            }
        });
        const mailOptions = {
            from: "prepanet-oficial@hotmail.com",
            to: "A00831137@tec.mx",
            subject: "Clave de acceso a la plataforma de prepanet de doble autenticación",
            html: `<b>Su codigo de verificacion es ${code[0]}</b>`,
        };
        
        transporter.sendMail(mailOptions);
    }catch(err){
        console.log(err);
        
    }
});

module.exports = router;