const express = require('express');
const router = express.Router();

const { Inscripcion, Alumno, User, Periodo, Seccion, Taller, Campus } = require('../../models/index');
const auth = require('../../middleware/Auth');
const { hasPerm } = require('../../middleware/Auth');

router.get('/home/', [auth, hasPerm('isCoord')], async(req, res)=>{

    const coordi = await req.user.getCoordinador({ include: Campus });

    // data for home dashboard
    let data = {}

    const { count, rows } = await Alumno.findAndCountAll({
        include: {
            model: Campus,
            where: {
                id: coordi.Campus.id
            }
        }
    });
    
    data.total_alumnos = count;

    const talleres = await Taller.findAll();
    // console.log(talleres);

    let tallerPromedio = []
    for(let taller of talleres){
        let temp = {}
        temp.id = taller.id
        temp.name = taller.nombre

        let seccions = await taller.getSeccions({
            where: {
                campusId: coordi.Campus.id
            },
            include: {
                model: Inscripcion
            }
        });
        
        let average = 0;
        let counter = 0;
        if (seccions.length > 0){
            for(let seccion of seccions){
                if (seccion.Inscripcions.length > 0){
                    for (let insc of seccion.Inscripcions){
                        average += insc.calificacion;
                        counter++;

                    }
                }
                
            }
            temp.promedio = average / counter;
        }else{
            temp.promedio = 0;
        }

        
        tallerPromedio.push(temp);

    }
    data.promedio = tallerPromedio;

    const activePeriod = await Periodo.findOne({
        where: {
            isActive: true
        }
    });

    data.activePeriod

    
    res.send(data);
});


router.get('/reporte/', [auth, hasPerm('isCoord')], async(req, res)=>{

    const user = req.user;
    const coordi = await user.getCoordinador({ include: Campus })
    const campus = coordi.Campus;
    console.log(campus);

    const inscripciones = await Inscripcion.findAll({
        where: {
            '$Alumno.campusId$': campus.dataValues['id']
        },
        include: [{
            model: Alumno,
            as: 'Alumno',
            include: {
                model: User
            }
        },
        {
            model: Periodo        
        },
        {
            model: Seccion,
            include: {
                model: Taller
            }
        }
    ]
    });


    let insc2Send = [];
    for (let inscripcion of inscripciones){
        let temp = {
            campus: {
                id: campus.dataValues['id'],
                nombre: campus.dataValues['name']
            },
            periodo: inscripcion.Periodo.dataValues['nombre'],
            matricula: inscripcion.Alumno.dataValues['matricula'],
            email: inscripcion.Alumno.User.dataValues['email'],
            approved: inscripcion.aprobado,
            estatus: inscripcion.estatus,
            taller: inscripcion.Seccion.Taller.dataValues['nombre']
        }
        insc2Send.push(temp);

    }


    res.send(insc2Send);
});


module.exports = router;