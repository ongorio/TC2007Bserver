const express = require('express');
const router = express.Router();

const { Inscripcion, Alumno, User, Periodo, Seccion, Taller, Campus } = require('../../models/index');
const auth = require('../../middleware/Auth');

router.get('/reporte/', auth, async(req, res)=>{

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

        const campus = inscripcion.Alumno.Campus


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