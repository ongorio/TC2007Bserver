const express = require('express');
const router = express.Router();


const { Alumno, Seccion, Inscripcion, Taller, User, Campus } = require('../../models/index');
const auth = require('../../middleware/Auth');


router.get('/alumnos/', auth, async(req, res)=>{
    
    const coordi = await req.user.getCoordinador();
    const campus = await coordi.getCampus();

    let alumnos = await Alumno.findAll({
        where:{
            'campusId': campus.dataValues['id']
        },
        include: [{
            model: User,
            attributes: [
                'id', 'first_name', 'last_name'
            ]
        },
    {
        model: Campus,
        attributes: [
            'id', 'name'
        ]
    }]
    });

    let alumnos2Send = [];
    
    for (let alumno of alumnos){
        let temp = {}
        temp.id = alumno.id;
        temp.first_name =  alumno.User.first_name;
        temp.last_name =  alumno.User.last_name;
        temp.matricula = alumno.matricula;
        temp.campus = {
            id: alumno.Campus.dataValues['id'],
            nombre: alumno.Campus.dataValues['name']
        }
        temp.taller = null;

        let inscs = await alumno.getInscripcions({
            where:{
                estatus: 'Cursando'
            },
            include: {
                model: Seccion,
                include: {
                    model: Taller
                }
            }
        });

        if (inscs[0]){
            let insc = inscs[0].dataValues;

            let taller = insc.Seccion.dataValues.Taller
            temp.taller = { id: taller.id, nombre: taller.nombre };
            
        }
        alumnos2Send.push(temp);

    }

    res.send(alumnos2Send)
});


router.get('/alumno/:id', async(req, res)=>{
    const alumno = await Alumno.findByPk(req.params.id);
    const user = await alumno.getUser();
    const campus = await alumno.getCampus();
    // console.log(campus);


    let alumnos2Send = {
        id: alumno.id,
        first_name: user.dataValues['first_name'],
        lsat_name: user.dataValues['last_name'],
        email: user.dataValues['email'],
        matricula: alumno.matricula,
        campus: {
            id: campus.dataValues['id'],
            name: campus.dataValues['name']
        }
    }

    return res.send(alumnos2Send);

})


module.exports = router;