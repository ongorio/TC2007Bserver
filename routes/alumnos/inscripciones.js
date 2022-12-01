const express = require('express');
const { Inscripcion, Taller, Seccion, Alumno, Periodo, Campus, User } = require('../../models/index');
const nodemailer = require('nodemailer');
const CodeGenerator = require('node-code-generator');
const config = require('config');
const auth = require('../../middleware/Auth');
const { hasPerm } = require('../../middleware/Auth');

const router = express.Router();



// Inscripcion Alumno
router.post('/inscribir/:id/', [auth, hasPerm('isAlumno')], async(req, res)=>{

    const taller = await Taller.findByPk(req.params.id);
    const alumno = await req.user.getAlumno({include: Campus});
    let periodo = await Periodo.findOne({ where: { isActive: true }});


    if(!taller) return res.status(404).send('No Taller Found!');
    if(!periodo) return res.status(404).send('No hay periodo activo!');


    let insc = await Inscripcion.findOne({
        where: {
            '$Seccion.tallerId$': taller.id,
            alumnoId: alumno.id,
            periodoId: periodo.id 
        },
        include: {
            model: Seccion,
            as: 'Seccion',
        }
    });

    if (insc){
        return res.status(400).send('Ya inscribiste esta materia!')
    }


    insc = await Inscripcion.findOne({
        where: {
            alumnoId: alumno.id,
            periodoId: periodo.id 
        },
        include: {
            model: Seccion,
            as: 'Seccion',
        }
    });

    if (insc){
        return res.status(400).send('Ya inscribiste una materia este periodo!')
    }



    insc = await Inscripcion.findOne({
        where: {
            aprobado:true,
            alumnoId: alumno.id,
            '$Seccion.tallerId$': taller.id,
        },
        include: {
            model: Seccion,
            as: 'Seccion',
        }
    });

    if (insc){
        return res.status(400).send('Ya acreditaste esta materia!')
    }

    // Check dependencies
    if (taller.orden > 1){
        const preTaller = await Taller.findOne({where: {orden: taller.orden-1}});
        
        
        insc = await Inscripcion.findOne({
            where:{
                aprobado:true,
                '$Seccion.tallerId$': preTaller.id
            }, 
            include: [{
                model: Seccion,
                as: 'Seccion'
            },
            {
                model: Alumno,
                where: {
                    id: alumno.id
                }
            }]
        });
        if (!insc){
            return res.status(400).send('No tienes las dependencias!');
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
            // console.log(taller.id);

            await seccion.setTaller(taller);
            await seccion.setPeriodo(periodo);
            await seccion.setCampus(alumno.Campus);
        }catch(e){
            console.log(e)
            res.status(400).send('No se pudo crear la seccion');

        }

    }
    
    
    try{
        // console.log(taller.id)

        let nuevaInsc = await Inscripcion.create({
            estatus: 'Cursando',
            aprobado: false,
        });
        nuevaInsc.calificacion = 0;
        
        nuevaInsc.setAlumno(alumno);
        nuevaInsc.setSeccion(seccion);
        nuevaInsc.setPeriodo(periodo);

        return res.send(nuevaInsc);
        // res
    }catch(e){
        console.log(e)
        res.status(400).send(e);
    }

    return res.status(400).send('something went wrong');
});


// Obtener curso a inscribir
router.get('/curso-inscribir/', [auth, hasPerm('isAlumno')], async(req, res)=>{
    const alumno = await req.user.getAlumno();

    // console.log(alumno)
    let talleres = await Taller.findAll({
        attributes: ['id', 'nombre', 'orden', 'description', 'duracion']
    });

    // console.log('hey')
    for (let taller of talleres){

        let insc;
        // console.log(taller.orden);
        if (taller.orden > 1){
            const preTaller = await Taller.findOne({where: {orden: taller.orden-1}});
            
            
            insc = await Inscripcion.findOne({
                where: {
                    aprobado: true,
                    '$Seccion.tallerId$': preTaller.id
                },
                include: [{
                    model: Seccion,
                    as: 'Seccion'
                },
                {
                    model: Alumno,
                    where: {
                        id: alumno.id
                    }
                }]
            });


            let insc2 = await Inscripcion.findOne({
                where: {
                    aprobado:true,
                    alumnoId: alumno.id,
                    '$Seccion.tallerId$': taller.id,
                },
                include: {
                    model: Seccion,
                    as: 'Seccion',
                }
            });
    
            if (insc && !insc2){
                return res.send(taller);
            }
        }else{

            insc = await Inscripcion.findOne({
                where: {
                    '$Seccion.tallerId$':taller.id,
                    aprobado: true
                },
                include: [{
                    model: Seccion,
                    as: 'Seccion',
                },
                {
                    model: Alumno,
                    where: {
                        id: alumno.id
                    }
                }]
            });

            if (!insc){
                return res.send(taller)
            }


        }
        
    }
    return res.status(404).send('No tienes talleres proximos')
});


// Historial de los cursos
router.get('/historial-cursos/', [auth, hasPerm('isAlumno')], async(req, res)=>{
    const alumno = await req.user.getAlumno();
    // let periodo = await Periodo.findOne({ where: { isActive: true }});
    // console.log(alumno);

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
        // console.log(taller)

        if (taller.Seccions.length > 0){
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
    // Consulta del alumno 
    const alumno = await Alumno.findOne({
        include:{
            model: User,
            where:{
                email: usuario
            }
        }
    });
    const validatePass = await alumno.User.validate_password(req.body.password);
    if(!alumno || !validatePass){
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
                        email: usuario
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
                email: req.body.email
            }
        }
    });
    const validatePass = await alumno.User.validate_password(req.body.password);
    if(!alumno || !validatePass){
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
                        email: req.body.email
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
        'token':verify.User.generateToken(),
    });
});

// Desincribir Materias
router.post('/desinscribir/', [auth, hasPerm('isAlumno')], auth, async(req, res)=>{
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