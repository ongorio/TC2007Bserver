const express = require('express');
const { Inscripcion, Taller, Seccion, Alumno, Periodo, Campus, User } = require('../../models/index');
const nodemailer = require('nodemailer');
const CodeGenerator = require('node-code-generator');
const config = require('config');
const auth = require('../../middleware/Auth');
const router = express.Router();



// Inscripcion Alumno
router.post('/inscribir/:id/', auth, async(req, res)=>{

    const taller = await Taller.findByPk(req.params.id);
    const alumno = await req.user.getAlumno({include: Campus});
    let periodo = await Periodo.findOne({ where: { isActive: true }});


    if(!taller) return res.status(404).send('No Taller Found!');
    if(!periodo) return res.status(404).send('No hay periodo activo!');


    let insc = await Inscripcion.findOne({
        where: {
            alumnoId: alumno.id,
            periodoId: periodo.id 
        },
        include: {
            model: Seccion,
            where:{
                tallerId: taller.id
            }
        }
    });

    if (insc){
        return res.status(400).send('Ya inscribiste esta materia!')
    }


    // Check dependencies
    if (taller.orden > 1){
        const preTaller = await Taller.findOne({where: {orden: taller.orden-1}});
        
        
        insc = await Inscripcion.findOne({
            include: [{
                model: Seccion,
                include: {
                    model: Taller,
                    where: {
                    id: preTaller.id
                }
            }
            },
            {
                model: Alumno,
                where: {
                    id: alumno.id
                }
            }]
        });

        if (!insc || !insc.aprobado){
            return res.status(400).send('No tiene las dependencias!');
        }
    }


    let seccion = await Seccion.findOne({
        where: { isOpen: true },
        include: {
            model: Periodo,
            where: {
                id: periodo.id
            }
        }
    });

    // console.log(alumno.Campus.id)
    if (!seccion){
        let {count, rows} = await Seccion.findAndCountAll(
            {
                include: [
                    {
                        model: Taller,
                        where: {
                            id: taller.id
                        }
                    },
                    {
                        model: Periodo,
                        where: {
                            id: periodo.id
                        }
                    },
                    {
                        model: Campus,
                        where : {
                            id: alumno.Campus.id
                        }
                    }
                ]
            }
        );

        let seccNum = (count > 0) ? count + 1: 1;

        
        try{
            seccion = await Seccion.create({
                isOpen: true,
                secNum: seccNum
            })

            await seccion.setTaller(taller);
            await seccion.setPeriodo(periodo);
            await seccion.setCampus(alumno.Campus);
        }catch(e){
            console.log(e)
            res.status(400).send('No se pudo crear la seccion');

        }

    }
    

    try{

        let nuevaInsc = await Inscripcion.create({
            estatus: 'Cursando',
            aprobado: false,
        });
        
        nuevaInsc.setAlumno(alumno);
        nuevaInsc.setSeccion(seccion);
        nuevaInsc.setPeriodo(periodo);

        return res.send(nuevaInsc);
    }catch(e){
        console.log(e)
        res.status(400).send(e);
    }

    return res.status(400).send('something went wrong');
});


// Obtener curso a inscribir
router.get('/curso-inscribir/', auth, async(req, res)=>{
    const alumno = await req.user.getAlumno();

    let talleres = await Taller.findAll({
        attributes: ['id', 'nombre', 'orden', 'description', 'duracion']
    });

    // console.log('hey')
    for (let taller of talleres){

        let insc;
        console.log(taller.orden);
        if (taller.orden > 1){
            const preTaller = await Taller.findOne({where: {orden: taller.orden-1}});
            
            
            insc = await Inscripcion.findOne({
                include: [{
                    model: Seccion,
                    include: {
                        model: Taller,
                        where: {
                        id: preTaller.id
                    }
                }
                },
                {
                    model: Alumno,
                    where: {
                        id: alumno.id
                    }
                }]
            });
    
            if (insc && insc.aprobado){
                return res.send(taller);
            }
        }else{


            insc = await Inscripcion.findOne({
                include: [{
                    model: Seccion,
                    include: {
                        model: Taller,
                        where: {
                        id: taller.id
                    }
                }
                },
                {
                    model: Alumno,
                    where: {
                        id: alumno.id
                    }
                }]
            });

            // console.log(insc)

            if (!insc || !insc.aprobado){
                return res.send(taller)
            }

        }
        
    }
    return res.status(404).send('No tienes talleres proximos')
});



// Historial de los cursos
router.get('/historial-cursos/', auth, async(req, res)=>{
    const alumno = await req.user.getAlumno();
    // let periodo = await Periodo.findOne({ where: { isActive: true }});


    let talleres = await Taller.findAll({
        attributes: ['id', 'nombre', 'orden', 'description', 'duracion'],
        include: {
            model: Seccion,
            include: {
                model: Inscripcion,
                where: {
                    alumnoId: alumno.id
                }
            }
        }
    })


    let tall = []
    for (let taller of talleres){
        let temp = {}
        temp.id = taller.id
        temp.nombre = taller.nombre
        temp.orden = taller.orden
        temp.description = taller.description
        temp.duracion = taller.duracion
        temp.approved = false
        temp.estatus = 'Sin Cursar'


        if (taller.Seccions){
            for (let seccion of taller.Seccions){
                if (seccion.Inscripcions){
                    for (let insc of seccion.Inscripcions){
                        if (insc.aprobado){
                            temp.approved = true;
                        }
                        temp.estatus = insc.estatus
                    }
                }
            }
        }


        tall.push(temp)
    }


    return res.send(tall);
});

// Posteo de login
router.post('/auth-login/', async(req, res)=>{
    const usuario = req.body.email;
    const contra = req.body.password;
    // Consulta del alumno 
    const alumno = await Alumno.findOne({
        include:{
            model: User,
            where:{
                email: usuario,
                password: contra
            }
        }
    });
    if(!alumno){
        return res.status(404).send('Intento de ingreso fallido');
    }
    try{
        let generator = new CodeGenerator();
        let code = generator.generateCodes('######', 1, {});
        await Alumno.update(
            {
                code: code[0]
            },
            {
                where:{},
                include:{
                    model: User,
                    where:{
                        email: usuario,
                        password: contra
                    }
                }
            }
        );
        if(!config.get('PASSWORD')){
            return res.status(404).send('Error with the password');
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
            to: `${usuario}`,
            subject: "Clave de acceso a la plataforma de prepanet de doble autenticación",
            html: `<b>Su codigo de verificacion es ${code[0]}</b>`,
        };
        transporter.sendMail(mailOptions);
        return res.status(200).send({
            'code':code[0]
        });
    }catch(err){
        console.log(err);
        return res.status(404).send('There was problems in obtaining the code and sending it');
    }
});

// Mandar a crear otro código
router.post('/auth-again/', async(req, res)=>{
    const alumno = await Alumno.findOne({
        include:{
            model: User,
            where:{
                email: req.body.email,
                password: req.body.password
            }
        }
    });
    if(!alumno){
        return res.status(404).send('Email or password wrong!!');
    }
    try{
        let generator = new CodeGenerator();
        let code = generator.generateCodes('######', 1, {});
        await Alumno.update(
            {
                code: code[0]
            },
            {
                where:{
                    code: alumno.code
                },
                include:{
                    model: User,
                    where:{
                        email: req.body.email,
                        password: req.body.password
                    }
                }
            }
        );
        if(!config.get('PASSWORD')){
            console.log('We have little problems with the email bot...');
            return res.status(404).send('Error with the password');
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
            to: `${req.body.email}`,
            subject: "Clave de acceso a la plataforma de prepanet de doble autenticación",
            html: `<b>Su codigo de verificacion es ${code[0]}</b>`,
        };
        transporter.sendMail(mailOptions);
        return res.status(200).send({
            'code':code[0],
            'email': req.body.email
        });
    }catch(err){
        console.log(err);
        return res.status(404).send('There was problems in obtaining the code and sending it');
    }
});

// Mandar a analizar el codigo que recibe
router.post('/auth-verify/', async(req, res)=>{
    const codigoDelCell = req.body.code;
    const emailCell = req.body.email;
    // Consulta si el codigo del celular es el mismo en la base de datos
    const verify = await Alumno.findOne({
        where:{
            code: codigoDelCell
        },
        include:{
            model: User,
            where:{
                email: emailCell
            }
        }
    });
    if(!verify){
        return res.status(404).send(`Doesn\'t exist`);
    }
    return res.status(200).send({
        'code':verify.code,
    });
});

// Desincribir Materias
router.post('/desinscribir/', auth, async(req, res)=>{
    const alumno = await req.user.getAlumno({include: Campus});
    const periodo = await Periodo.findOne({ where: { isActive: true }});


    if (!periodo) return res.status(404).send("No hay periodo activo!");


    const insc = await Inscripcion.findOne({
        where: {
            alumnoId: alumno.id,
            periodoId: periodo.id
        },
        include: {
            model: Seccion
        }
    });

    if (!insc) return res.status(400).send('No tienes materias inscritas!');

    try{
        await Inscripcion.destroy({
            where: {
                id: insc.id
            }
        })
        res.send('Exito')
    }catch(e){
        res.status(400).send('No se pudo eliminar');
    }
});




module.exports = router;