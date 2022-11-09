const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

router.post("/code-section/", (req, res) => {
    // falta la info del correo administrativo que mandara los correos
    const CLIENT_ID='';
    const CLIENT_SECRET='';
    const REDIRECT_URI='';
    const REFRESH_TOKEN='';

    const authentication = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    authentication.setCredentials({refresh_token:REFRESH_TOKEN});
    try{
        const accessToken = authentication.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                type:"OAuth2",
                user:"", // el contestador automatico
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            }
        });
        const mailOptions = {
            from: "Generadora de claves automática<correoAdmin@tec.mx>",
            to: "guillenmarcelo67@gmail.com",
            subject: "Aqui esta su clave de acceso",
            html: "",   // falta generar un codigo que sea temporal y que el acceso tambien conozca
        };
        
        transporter.sendMail(mailOptions);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;