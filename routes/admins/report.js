const express = require('express');
const router = express.Router();

const { Inscripcion, Alumno, User, Periodo, Seccion, Taller, Campus } = require('../../models/index');
const auth = require('../../middleware/Auth');
const { hasPerm } = require('../../middleware/Auth');

router.get('/reporte/', [auth, hasPerm('isAdmin')], async(req, res)=>{

    const inscripciones = await Inscripcion.findAll({
        include: [{
            model: Alumno,
            as: 'Alumno',
            include: [
            {
                model: User
            },
            {
                model: Campus
            }
        ]
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

        const campus = inscripcion.Alumno.Campus;


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
        };
        insc2Send.push(temp);
    }

    res.send(insc2Send);
});


router.get('/home/', [auth, hasPerm('isAdmin')], async(req, res)=>{


    // data for home dashboard
    let data = {}

    const { count, rows } = await Alumno.findAndCountAll({
        include: {
            model: Campus,
        }
    });
    
    data.total_alumnos = count;

    const talleres = await Taller.findAll();
    // console.log(talleres);

    let talllerPromedio = []
    for(let taller of talleres){
        let temp = {}
        temp.id = taller.id
        temp.name = taller.nombre

        let seccions = await taller.getSeccions({
            include: {
                model: Inscripcion
            }
        });
        
        let average = 0;
        let counter = 0;
        if (seccions.length > 0){
            console.log()
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

        talllerPromedio.push(temp);
    }
    data.promedios = talllerPromedio;


    const campuses = await Campus.findAll({ include: Alumno });

    let campusAlumnos = []
    for (let campus of campuses){
        let temp = {}
        temp.nombre = campus.name;
        temp.id = campus.id
        temp.alumnos = campus.Alumnos.length
        campusAlumnos.push(temp)
    }

    data.alumno_por_campus = campusAlumnos;



    const activePeriod = await Periodo.findOne({
        where: {
            isActive: true
        }
    });

    data.activePeriod

    res.send(data);

});


module.exports = router;