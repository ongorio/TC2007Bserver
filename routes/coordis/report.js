const express = require('express');
const router = express.Router();

const { Inscripcion, Alumno, User, Periodo, Seccion, Taller } = require('../../models/index');
const auth = require('../../middleware/Auth');
const { hasPerm } = require('../../middleware/Auth');

router.get('/reporte/', [auth, hasPerm('isCoord')], async(req, res)=>{

    const user = req.user;
    const coordi = await user.getCoordinador()
    const campus = await coordi.getCampus();
    // console.log(campus);

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