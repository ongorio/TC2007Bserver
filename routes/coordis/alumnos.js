const express = require('express');
const router = express.Router();


const { Alumno, Seccion, Inscripcion, Taller, User } = require('../../models/index');



router.get('/alumnos/', async(req, res)=>{
    
    let alumnos = await Alumno.findAll({
        include: {
            model: User,
            attributes: [
                'id', 'first_name', 'last_name'
            ]
        }
    });

    let alumnos2Send = [];

    
    
    for (let alumno of alumnos){
        let temp = {}
        temp.id = alumno.id;
        temp.first_name =  alumno.User.first_name;
        temp.last_name =  alumno.User.last_name;
        temp.matricula = alumno.matricula;
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


module.exports = router;