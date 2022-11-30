const express = require('express');
const router = express.Router();

const { Coordinador, Campus, User, Alumno, Seccion, Taller } = require('../../models/index');
const auth = require('../../middleware/Auth');
const { hasPerm } = require('../../middleware/Auth');

router.get('/coordinadores/', [auth, hasPerm('isAdmin')], async(req, res)=>{

    const coordinadores = await Coordinador.findAll({include: [User, Campus]});
    // console.log(coordinadores);

    let coordis2send = []
    for (let coordi of coordinadores){
        let temp = {}
        let user = coordi.User;
        temp.id = coordi.id
        temp.nombre = user.first_name;
        temp.apellido = user.last_name;
        temp.email = user.email
        temp.campus = {
            id: coordi.Campus.id,
            nombre: coordi.Campus.name
        }
        coordis2send.push(temp);
    }


    res.send(coordis2send);


});


router.get('/coordinador/:id/', [auth, hasPerm('isAdmin')], async(req, res)=>{

    const coordi = await Coordinador.findByPk(req.params.id,{
        include: [Campus]
    });

    const alumnos = await Alumno.findAll({
        where: {
            '$Campus.id$': coordi.Campus.id
        },
        include: [{
            model:Campus,
            as: 'Campus'
        },{
            model: User
        }
    ]
    }); 

    let alumnos2send = []
    for (let alumno of alumnos){
        let temp = {}
        let user = alumno.User
        temp.id = alumno.id
        temp.first_name = user.first_name
        temp.last_name = user.last_name
        temp.email = user.email
        temp.campus = {
            id: coordi.Campus.id,
            nombre: coordi.Campus.name
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
        alumnos2send.push(temp);
    }
    res.send(alumnos2send);

})


module.exports = router;